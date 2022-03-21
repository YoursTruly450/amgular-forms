import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        MyValidators.restrictedEmails
      ], [MyValidators.uniqueEmail] as AsyncValidatorFn[]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      address: new FormGroup({
        country: new FormControl('kz'),
        city: new FormControl('Astana', Validators.required)
      }),
      skills: new FormArray([])
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log(formData);
      this.form.reset();
    }
  }

  setCapital() {
    const cityMap = {
      ru: 'Moscow',
      ua: 'Kiev',
      by: 'Minsk',
      kz: 'Astana'
    }

    const cityKey: 'ru' | 'ua' | 'by' | 'kz' = this.form.get('address')!.get('country')!.value;
    const city = cityMap[cityKey];

    this.form.patchValue({
      address: {city}
    });
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    // (<FormArray>this.form.get('skills')).push();
    (this.form.get('skills') as FormArray).push(control);
  }

  getControls() {
    return this.form.get('skills') as FormArray;
  }
}
