
//mport {AgmPolyline} from 'packages/core/src/lib/directives/polyline.ts';
import {  MapsAPILoader} from '@agm/core';
import { GoogleMap, MouseEvent } from '@agm/core/services/google-maps-types';
import { MapType } from '@angular/compiler';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { NgZone , ElementRef, OnDestroy } from '@angular/core';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { privateDecrypt } from 'crypto';
import { Subscription } from 'rxjs';
//import GoogleMaps from '@agm/core'

declare const google: any

interface marker {
	lat: number;
	lng: number;
	draggable: boolean;
  iconUrl?:string;
  
}

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements OnInit,OnDestroy{

  title: string = 'AGM project';
  latitude: number
  longitude: number
  zoom:number
  origlatlng:{lat:number,lng:number,draggable:boolean}
  destlatlng:{lat:number,lng:number,draggable:boolean}
  mapTypeId: "roadmap"
 
  private geoCoder ;
  address:string;
  points:{lat:number,lng:number}[];
  marker:marker[]=[];
  _originFormat:{lat:number,lng:number}
  _destinationFormat:{lat:number,lng:number}
  map:  google.maps.Map;
  distance:number;
  test:number;
  options=[{value:"DRIVING", label:'Driving'},
           {value:"WALKING", label:'Walking'},
           {value:"BICYCLING", label:'Bicylcling'},
           {value:"TRANSIT", label:'Transit'}]
  tmode:string;  // instead of using reactive form
  // selectedMode:string 
  modeSelection:FormGroup   
  modeSubscription:Subscription 
 
  //directionsService :google.maps.DirectionsService;
  //directionsRenderer :  google.maps.DirectionsRenderer;    
  //****************deffinee map properties here */
  constructor( 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) { 

       this.modeSelection = new FormGroup({
        mode: new FormControl('',Validators.requiredTrue)
     })
    }

    get mode(){
      return this.modeSelection.get('mode')
    }
  ngOnDestroy(): void {
    this.modeSubscription.unsubscribe();
  }

  @ViewChild('origin',{static:false}) public originElementRef: ElementRef;
  @ViewChild('destination',{static:false})public destinationElementRef: ElementRef;
 // @ViewChild('tmode',{static:false})public mode: HTMLInputElement;



  ngOnInit(){
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          //this.getAddress(this.latitude,this.longitude);
          this.geoCoder = new google.maps.Geocoder;
//let autocompletedest=new google.maps.places.Autocomplete(this.destination.nativeElement)
          let origine = new google.maps.places.Autocomplete(this.originElementRef.nativeElement);
          let destination=new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement);
          origine.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = origine.getPlace();
    
              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
    
              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.origlatlng={lat:this.latitude,lng:this.longitude,draggable:false}
              this.marker.push(this.origlatlng)
              this._originFormat={lat:this.origlatlng.lat,lng:this.origlatlng.lng}
              //this.index.push(this.marker.indexOf(origlatlng))
              
              this.zoom = 12;
            });
          });
            destination.addListener("place_changed", ()=>{
              this.ngZone.run(() => {
                //get the place result
                let _place: google.maps.places.PlaceResult = destination.getPlace();
                if (_place.geometry === undefined || _place.geometry === null) {
                  return;
                }
                this.latitude = _place.geometry.location.lat();
                this.longitude =_place.geometry.location.lng();
                this. destlatlng={lat:this.latitude,lng:this.longitude,draggable:false}
                this.marker.push(this.destlatlng)
                this._destinationFormat={lat:this.destlatlng.lat,lng:this.destlatlng.lng}
            })} )     
           });
    
    
  }
  
  //get currentLocation of user and mark it on the map with the marker
  
  setCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        this.marker.push({lat:this.latitude,lng:this.longitude,draggable:true,iconUrl:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"})
        this.getAddress(this.latitude,this.longitude)
        this.zoom=12;
        
      }
        )
    }     
  }
  onChange($event){
    this.tmode=$event.value
    console.log(this.tmode)
    if(typeof this.directionsRenderer!=="undefined"){
      this.directionsRenderer.setMap(null)
      this.directionsRenderer = null;
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map)
      this.setRoute()
    }       
  }
          
  
  mapReady(event){
    this.map=event;
  }

  markerDragEnd(marker,$event:any){
    //$event.preventDefault()
    
    console.log($event);
    this.latitude=$event.latLng.lat();
    this.longitude=$event.latLng.lng();
    this.getAddress(this.latitude,this.longitude);
    
  }
  mapClick($event:any){
    console.log($event)
    this.getAddress($event.coords.lat,$event.coords.lng );
    this.marker.push({lat:$event.coords.lat  , lng:$event.coords.lng , draggable:true}
    
     )
  }

  deleteMarker(){
    for(let i=1;i< this.marker.length;i++){
          this.marker.splice(i,this.marker.length-1)
    }
  }

  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: this.latitude, lng:this.longitude} }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  
/* modeSelect($event, mode) {
    this.mode=$event.target.value;
    
    }*/


 getDistance():number {
    
   const R = 6371e3; // metres
   const ol = this._originFormat.lat * Math.PI/180; // φ, λ in radians
   const dl = this._destinationFormat.lat * Math.PI/180;
   const delta_ODlat = (this._destinationFormat.lat-this._originFormat.lat) * Math.PI/180;
   const delta_ODlng = (this._destinationFormat.lng-this._originFormat.lng) * Math.PI/180;

  const a = Math.sin(delta_ODlat/2) * Math.sin(delta_ODlat/2) +
          Math.cos(ol) * Math.cos(dl) *
          Math.sin(delta_ODlng/2) * Math.sin(delta_ODlng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = (R * c )/1000; 
  console.log(distance)
  this.test=distance 
  return distance 

 }
setPolyline(){
  var bounds = new google.maps.LatLngBounds();
    var route = [
      this._originFormat,
      this._destinationFormat
      
   ];
   bounds.extend(this._originFormat)
   bounds.extend(this._destinationFormat)
   var polyline = new google.maps.Polyline({
        path: route,
        strokeColor: "#ff0550",
        strokeOpacity: 0.6,
        strokeWeight: 5
    });
    // normalement a chaque fois la valeur de la distance va changer
    //donc il faut mieux utiliser obervable apres
    this.distance = google.maps.geometry.spherical.computeLength(polyline.getPath());
    alert("polyline is "+this.distance+" long");

    polyline.setMap(this.map);
    this.directionsRenderer.setMap(null)
    this.directionsRenderer=new google.maps.DirectionsRenderer()
    this.directionsRenderer.setMap(this.map)
    };




removePolyline(){}


 directionsService : google.maps.DirectionsService;
 directionsRenderer : google.maps.DirectionsRenderer;

 distanceMode:string
setRoute(){
   
 this.directionsService =new  google.maps.DirectionsService();
 this.directionsRenderer=new google.maps.DirectionsRenderer();
 this.directionsRenderer.setMap(this.map)
  const req={
    origin:this._originFormat,
    destination:this._destinationFormat,
    travelMode: google.maps.TravelMode[this.tmode]
  }
    this.directionsService.route(req,(res,status)=>{
   this. directionsRenderer.setDirections(res)
    //console.log(res.routes[0].legs[0].distance.text)
    this.distanceMode=res.routes[0].legs[0].distance.text
    
    console.log(this.distanceMode)  
    } )
    this.directionsRenderer.getDirections();
    
     
}
//pointList: { lat: number; lng: number }[] = [];
//selectedArea = 0;
/*updatePointList(path) {
  this.pointList = [];
  const len = path.getLength();
  for (let i = 0; i < len; i++) {
    this.pointList.push(
      path.getAt(i).toJSON()
    );
  }
  this.selectedArea = google.maps.geometry.spherical.computeArea(
    path
  );
}*/




DrawingManager() {
  const options = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon",'polyline','marker']
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: google.maps.drawing.OverlayType.POLYGON
  };

  const drawingManager = new google.maps.drawing.DrawingManager(options);
  drawingManager.setMap(this.map);
  google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
    // Polygon drawn
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      //this is the coordinate, you can assign it to a variable or pass into another function.
        console.log("Polygon points:"+JSON.stringify(event.overlay.getPath().getArray()));
        const list=event.overlay.getPaths().getArray();
        var polygoneDistance=0
        for(let i =0; i<list.length;i++){
          polygoneDistance +=google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(list[i].lat, list[i].lng),new google.maps.LatLng(list[i+1].lat, list[i+1].lng))

        }
        console.log(polygoneDistance)
      
      //verticles.forEach((verticle, ind)=>{
      //console.log({
        /*index: ind,
        lat: verticle.getAt(ind).lat(),
        lng: verticle.getAt(ind).lng(),
        obj: verticle.getAt(ind)})*/
       // const point=event.overlay.getPath().getArray()
        //console.log(google.maps.geometry.spherical.computeLength(event.overlay.getPath()))
       // google.maps.geometry.spherical.computeLength(event.overlay.getPath());
      // for(let p of point){
      //  console.log(google.maps.geometry.spherical.computeLength(p.getPath()))}
    //})
     
    
  }


})
}
}