import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {
  // b64 encoded png
  image: string;

  // Dimensions of the captured webcam image. We use this to determine the size
  // of the canvas we create for image manipulation purposes.
  width: number;
  height: number;

  // Filter id
  filter: number;

  filterImages: string[] = ['la_muse.jpg', 'rain_princess.jpg', 'udnie.jpg',
                            'wave.jpg'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private _imageService: ImageService) {}


  ngOnInit() {
    this.image = sessionStorage.getItem('imageStorage');
    this.width = Number(sessionStorage.getItem('width'));
    this.height = Number(sessionStorage.getItem('height'));
  }

  // Navigate to result page
  confirmFilter() {
    this.uploadImage(this.image, this.filter);
    this.router.navigate(['result']);
  }

  // Begin process again by redirecting to camera page
  startOver() {
    this.router.navigate(['camera']);
    sessionStorage.clear();
  }


  uploadImage(image, filter) {
    this._imageService.uploadImage(image, filter).subscribe(
      data => {
        //this.router.navigate(['filter']);
        return true;
      },
      error => {
        console.error('Error uploading image');
      }

    );
  }


  onFilterCardClick(filter) {
    console.log(filter);

    document.getElementById('filter-card-' + this.filter).style.opacity = '0.5';
    document.getElementById('filter-card-' + filter).style.opacity = '1';

    this.filter = filter;
  }
}
