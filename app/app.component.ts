import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Tap Room</h1>
    <button (click)="showAddForm()">Add a Keg</button>
    <button (click)="colorByPrice()">Color by Price</button>
    <button (click)="colorByAlcohol()">Color by Alcohol Content</button>
    <ul>
      <li *ngFor="let currentKeg of kegs" [class]="whichColorCode(currentKeg)">Name: {{currentKeg.name}}, Brand: {{currentKeg.brand}}, Price: {{currentKeg.getPrice()}}, Alcohol Content: {{currentKeg.alcoholContent}}%, <span [class]="pintsLow(currentKeg)">Pints Left: {{currentKeg.pintsLeft}}</span> <button (click)="editKeg(currentKeg)">Edit!</button><button (click) = "currentKeg.decrementPint()">Take a Pint</button></li>
    </ul>
    <hr>
    <div>
      <div *ngIf = "selectedKeg">
        <h3>Edit Keg: {{selectedKeg.name}}</h3>
        <label>Keg Name:</label>
        <input [(ngModel)]="selectedKeg.name"><br>
        <label>Keg Brand:</label>
        <input [(ngModel)]="selectedKeg.brand"><br>
        <label>Keg Price(in cents):</label>
        <input [(ngModel)]="selectedKeg.price" type="number"><br>
        <label>Keg Alcohol Content(in percent):</label>
        <input [(ngModel)]="selectedKeg.alcoholContent" type="number"><br>
        <button (click)="finishedEditing()">Done</button>
      </div>
      <div *ngIf = "newKeg">
        <h3>Add a Keg</h3>
        <label>Keg Name:</label>
        <input [(ngModel)]="newKeg.name"><br>
        <label>Keg Brand:</label>
        <input [(ngModel)]="newKeg.brand"><br>
        <label>Keg Price(in cents):</label>
        <input [(ngModel)]="newKeg.price" type="number"><br>
        <label>Keg Alcohol Content(in percent):</label>
        <input [(ngModel)]="newKeg.alcoholContent" type="number"><br>
        <button (click)="addKeg()">Add this keg</button>
      </div>
    </div>
  </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg('Moo1', 'Moocows', 399, 20),
    new Keg('Moo2', 'Moocows', 699, 60),
    new Keg('Moo3', 'Moocows', 99, 1)
  ];
  selectedKeg = null;
  newKeg = null;
  colorCode: string = "none";

  pintsLow(lowKeg) {
    if(lowKeg.pintsLeft <= 10) {
      return "red";
    }
  }

  colorByPrice() {
    this.colorCode = "price";
  }

  colorByAlcohol() {
    this.colorCode = "alcohol";
  }

  whichColorCode(selectedKeg) {
    if(this.colorCode === "price") {
      if(selectedKeg.price >= 500) {
        return "bg-danger";
      } else {
        return "bg-warning";
      }
    }
    else if(this.colorCode === "alcohol") {
      if(selectedKeg.alcoholContent >= 40) {
        return "bg-danger";
      } else if(selectedKeg.alcoholContent >= 20) {
        return "bg-warning";
      } else {
        return "bg-info";
      }
    }
  }

  addKeg() {
    this.kegs.push(this.newKeg);
    this.newKeg = null;
  }

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  finishedEditing() {
    this.selectedKeg = null;
  }

  showAddForm() {
    this.newKeg = new Keg('', '', 0, 0);
  }
}

export class Keg {
  public pintsLeft: number = 124;

  constructor(public name: string, public brand: string, public price: number, public alcoholContent: number) { }

  getPrice() {
    var priceArrays: string[] = this.price.toString().split('');
    var resultArrays: string[] = [];
    var counter: number = priceArrays.length;

    resultArrays.push('$');
    for(var numeral of priceArrays) {
      if(counter === 2) {
        resultArrays.push('.');
      }
      resultArrays.push(numeral);
      counter--;
    }
    var resultString: string = resultArrays.join('');

    return resultString;
  }

  decrementPint() {
    this.pintsLeft--;
  }
}
