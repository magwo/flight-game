import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sprite } from './sprite/sprite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sprite],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('flight-game');
}
