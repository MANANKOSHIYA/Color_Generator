import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'History';

  letters = '0123456789ABCDEF';
  color: { id: number, color1: string, color2: string, color3: string }[] = [];
  color1!: string;
  color2!: string;
  color3!: string;
  getColor: any;
  currentColorId: any;
  BGcolor = "#c4bbbb";
  generatedColor: any;
  showBG: any;
  y: any;

  ngOnInit(): void {
    this.getColorFromLocalStorage();
    this.displayCurrentColor();
   
  }

  constructor(private route: ActivatedRoute) { }

  getRandomColor() {
    if (this.color.length == 0 || this.currentColorId == this.color.length) {
      this.color1 = '#';
      this.color2 = '#';
      this.color3 = '#';
      for (var i = 0; i < 6; i++) {
        this.color1 += this.letters[Math.floor(Math.random() * 16)];
        this.color2 += this.letters[Math.floor(Math.random() * 16)];
        this.color3 += this.letters[Math.floor(Math.random() * 16)];
        
      }

      const generatedColor = {
        id: this.color.length + 1,
        color1: this.color1,
        color2: this.color2,
        color3: this.color3,
      };
      console.log("id>>", generatedColor.id);
      this.color.push(generatedColor);
      console.log("Colors==>", this.color);
      localStorage.setItem('Color', JSON.stringify(this.color));

      this.getColorFromLocalStorage();
      this.currentColorId = this.color.length;
      this.displayCurrentColor();

    }
    else {
      return;
    }
  }


  getColorFromLocalStorage() {
    const Colors2 = JSON.parse(localStorage.getItem('Color') || '[]');
    this.getColor = Colors2;
  }

  ClearData() {
    localStorage.clear();
    window.location.reload();
  }

  previousColor() {
    if (this.currentColorId > 1) {
      this.currentColorId--;
    }
    this.displayCurrentColor();
    
  }

  nextColor() {
    if (this.currentColorId < this.color.length) {
      this.currentColorId++;
    }
    this.displayCurrentColor();
   
  }

  displayCurrentColor() {
    const storedColors = JSON.parse(localStorage.getItem('Color') || '[]');
    let currentColor = storedColors.find((color: { id: number; }) => color.id === this.currentColorId);

    if (currentColor) {
      this.color1 = currentColor.color1;
      this.color2 = currentColor.color2;
      this.color3 = currentColor.color3;

    }
  }

  
}
