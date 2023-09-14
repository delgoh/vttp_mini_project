import { Component, OnInit, inject } from '@angular/core';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';

@Component({
  selector: 'app-exhibitions-overview',
  templateUrl: './exhibitions-overview.component.html',
  styleUrls: ['./exhibitions-overview.component.css']
})
export class ExhibitionsOverviewComponent implements OnInit {

  exhibitorService = inject(ExhibitorService)

  displayedColumns: string[] = []
  tableData: {
    index: number,
    name: string,
    exhibitorId: string
  }[] = []

  ngOnInit(): void {
    this.exhibitorService.getAllExhibitorsAsOrganizer()
      .then(res => {
        this.tableData = res.map((exhibitor, index) => {
          return {
            ...exhibitor,
            index: index + 1
          }
        })
        this.displayedColumns = ['index', 'name', 'exhibitorId']
      }).catch(err => {
        console.error(err)
      })
  }

}
