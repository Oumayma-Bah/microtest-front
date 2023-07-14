import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass'],
})
export class GalleryComponent {
  currentIndex: any = -1;
  showFlag: any = false;

  imageObject: Array<object> = [
    {
      image: 'assets/images/image-gallery/1.png',
      thumbImage: 'assets/images/image-gallery/1.png',
      title: 'Image 1',
    },
    {
      image: 'assets/images/image-gallery/2.png',
      thumbImage: 'assets/images/image-gallery/2.png',
      title: 'Image 2',
    },
    {
      image: 'assets/images/image-gallery/3.png',
      thumbImage: 'assets/images/image-gallery/3.png',
      title: 'Image 3',
    },
    {
      image: 'assets/images/image-gallery/4.png',
      thumbImage: 'assets/images/image-gallery/4.png',
      title: 'Image 4',
    },
    {
      image: 'assets/images/image-gallery/5.png',
      thumbImage: 'assets/images/image-gallery/5.png',
      title: 'Image 5',
    },
    {
      image: 'assets/images/image-gallery/6.png',
      thumbImage: 'assets/images/image-gallery/6.png',
      title: 'Image 6',
    },
    {
      image: 'assets/images/image-gallery/7.png',
      thumbImage: 'assets/images/image-gallery/7.png',
      title: 'Image 7',
    },
    {
      image: 'assets/images/image-gallery/8.png',
      thumbImage: 'assets/images/image-gallery/8.png',
      title: 'Image 8',
    },
    {
      image: 'assets/images/image-gallery/9.png',
      thumbImage: 'assets/images/image-gallery/9.png',
      title: 'Image 9',
    },
    {
      image: 'assets/images/image-gallery/10.png',
      thumbImage: 'assets/images/image-gallery/10.png',
      title: 'Image 10',
    },
    {
      image: 'assets/images/image-gallery/11.png',
      thumbImage: 'assets/images/image-gallery/11.png',
      title: 'Image 11',
    },
    {
      image: 'assets/images/image-gallery/12.png',
      thumbImage: 'assets/images/image-gallery/12.png',
      title: 'Image 12',
    },
  ];

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
