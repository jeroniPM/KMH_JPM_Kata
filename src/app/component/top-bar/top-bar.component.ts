import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TooltipWrapperComponent } from '../tooltip/tooltip-wrapper.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  imports: [RouterLink, TooltipWrapperComponent],
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/