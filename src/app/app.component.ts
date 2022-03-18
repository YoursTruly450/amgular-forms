import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      address: new FormGroup({
        country: new FormControl('kz'),
        city: new FormControl('Astana', Validators.required)
      })
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
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
}
