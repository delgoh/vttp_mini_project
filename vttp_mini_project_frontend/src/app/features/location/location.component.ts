import { NgxGpAutocompleteDirective } from '@angular-magic/ngx-gp-autocomplete';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {

  private API_KEY = "AIzaSyCqNpXakfL4h_rIYUAjuXvs40ObioETkXY"

  locationForm!: FormGroup
  fb = inject(FormBuilder)
  http = inject(HttpClient)

  @ViewChild("mapRef") mapRef: any

  zoom = 11;
  display = {lat: 0, lng: 0};
  apiLoaded!: Observable<boolean>;

  center = {
    lat: 1.325,
    lng: 103.828
  };

  loader!: Loader;
  // mapOptions = {
  //   bounds: this.defaultBounds,
  //   componentRestrictions: { country: "sg" },
  //   fields: ["address_components", "geometry", "icon", "name"],
  //   strictBounds: true
  // }
  mapOptions: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.apiLoaded = this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}&libraries=places,maps`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
    this.locationForm = this.fb.group({
    })
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng!.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

  autocompleteInputControl: FormControl = new FormControl<string>('');
  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;


  selectAddress(place: google.maps.places.PlaceResult): void {
    console.log(place);
    // console.log(this.mapRef)
    // (this.mapRef.nativeElement as GoogleMap).center.lat = place.geometry?.location?.lat() || 1.325;
    // (this.mapRef.nativeElement as GoogleMap).center.lng = place.geometry?.location?.lat() || 103.828
    // this.center.lat = place.geometry?.location?.lat() || 1.325
    // this.center.lng = place.geometry?.location?.lat() || 103.828
    // console.log(place.geometry?.location?.lat());

    console.log(this.placesRef.el.nativeElement.value);
  }

}
