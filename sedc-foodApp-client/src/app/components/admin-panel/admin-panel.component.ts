import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPanelService } from '../../services/admin-panel.service'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  form:FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _adminPanelService: AdminPanelService
  ) { }

  ngOnInit(): void {
    this.createRestorauntForm();
  }

  createRestorauntForm() {
    this.form = this._formBuilder.group({
      name:['', Validators.required],
      address:['', Validators.required],
      // menu:['', Validators.required],
      municipality:['', Validators.required],
    })
  }


  addRestoraunt() {
    if (this.form.valid) {
      // this._adminPanelService.addRestoraunt(this.form.value);
      console.log(this.form.value)
    } else {
      alert("Form not valid!")
    }
  }








}
