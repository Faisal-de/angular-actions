import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  display ='';
  history: string[] = [];
  appendToDisplay(value: string) {
    this.display += value;
  }
  //Actual calculator logic
  calculate() {
    try {
      // Evaluate the expression 
      const result = new Function('return ' + this.display)();
      const record=`${this.display} = ${result}`;
      this.history.push(record);
      this.display = result.toString();
    } catch (error) {
      this.display = 'Error';
    }
  }
  clearDisplay(){
    this.display='';
  }
  deleteHistoryItem(index: number) {
    this.history.splice(index, 1);
  }
  clearAllHistory(){
    this.history = [];
  }  
}