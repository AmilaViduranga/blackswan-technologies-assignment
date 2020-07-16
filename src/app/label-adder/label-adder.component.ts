import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-adder',
  templateUrl: './label-adder.component.html',
  styleUrls: ['./label-adder.component.css']
})
export class LabelAdderComponent implements OnInit {

  @Input() labelArray: Array<string> = new Array<string>();
  @Input() adderName: string;
  @Input() placeholder:string;
  tileName: string;

  constructor() { }

  ngOnInit() {
  }

  addToList() {
    this.labelArray.push(this.tileName);
    this.tileName = "";
  }

}
