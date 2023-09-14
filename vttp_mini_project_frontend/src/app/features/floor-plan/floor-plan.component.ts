import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Konva from 'konva';
import { FloorplanService } from 'src/app/core/services/floorplan.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.css']
})
export class FloorPlanComponent implements OnInit {

  floorplanService = inject(FloorplanService)
  snackBar = inject(MatSnackBar)

  rectangles: Konva.Rect[] = []
  layer = new Konva.Layer();

  ngOnInit(): void {
    this.generateKonva()
  }

  generateKonva() {

    const stage = new Konva.Stage({
      container: 'konva-floor-plan',
      width: document.querySelector<HTMLElement>('.konva-container')?.offsetWidth || 600,
      height: document.querySelector<HTMLElement>('.konva-container')?.offsetHeight || 400
    });
    stage.container().style.backgroundColor = 'white';
    stage.add(this.layer);

    this.addRect()
    this.addRect()


    const tr = new Konva.Transformer();

    const selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    });

    this.layer.add(tr);
    this.layer.add(selectionRectangle)
    tr.nodes(this.rectangles)

    var x1: number, y1: number, x2: number, y2: number;
    stage.on('mousedown touchstart', (e) => {
      // do nothing if we mousedown on any shape
      if (e.target !== stage) {
        return;
      }
      e.evt.preventDefault();
      x1 = stage.getPointerPosition()!.x;
      y1 = stage.getPointerPosition()!.y;
      x2 = stage.getPointerPosition()!.x;
      y2 = stage.getPointerPosition()!.y;

      selectionRectangle.visible(true);
      selectionRectangle.width(0);
      selectionRectangle.height(0);
    });

    stage.on('mousemove touchmove', (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault()
      x2 = stage.getPointerPosition()!.x
      y2 = stage.getPointerPosition()!.y

      selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      })
    })

    stage.on('mouseup touchend', (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault()
      // update visibility in timeout, to be checked click event
      setTimeout(() => {
        selectionRectangle.visible(false)
      });

      var shapes = stage.find('.rect')
      var box = selectionRectangle.getClientRect()
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      )
      tr.nodes(selected)
    })

    // clicks should select/deselect shapes
    stage.on('click tap', function (e: any) {
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        return
      }
      // if click on empty area - remove all selections
      if (e.target === stage) {
        tr.nodes([])
        return
      }

      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName('rect')) {
        return
      }

      // shift or ctrl selection
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
      const isSelected = tr.nodes().indexOf(e.target) >= 0

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target])
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice() // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1)
        tr.nodes(nodes)
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target])
        tr.nodes(nodes)
      }
    })

    document.getElementById('deleteRect')?.addEventListener(
      'click',
      () => {
        console.log(this.rectangles)
        this.rectangles = this.rectangles.filter(rect => {
          return !tr.nodes()
            .map(node => node._id)
            .includes(rect._id)
        })
        tr.nodes().forEach(rect => rect.destroy())

        console.log(this.rectangles)
        console.log(tr.nodes())
      }
    )

    document.getElementById('saveImage')?.addEventListener(
      'click',
      () => {
        const dataUrl = stage.toDataURL()
        this.floorplanService.saveFloorPlan(dataUrl)
        .then(res => {
          if (res['isSaved']) {
            this.snackBar.open("Image saved successfully!", "Dismiss", {
              duration: 5000
            })
          }
        })
      }
    )
  }

  addRect() {
    const newRect = new Konva.Rect({
      x: 300,
      y: 200,
      width: 50,
      height: 50,
      fill: '#cce6ff',
      name: 'rect',
      draggable: true,
    });
    this.rectangles.push(newRect)
    this.layer.add(newRect)
  }

}
