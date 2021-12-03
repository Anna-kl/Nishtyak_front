import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  constructor( @Inject(DOCUMENT) private document: Document,
               private renderer2: Renderer2 ) { }

  @ViewChild('addCart') private animateThis: ElementRef | undefined;

  ngOnInit(): void {
      this.loadScript();
  }

    private loadScript() {
        const textScript = this.renderer2.createElement('script');
        textScript.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ac45cf9651964c26bd2478cc52954d27d3c5ada3b6337c45d23f2654038c8ee64&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true';
        this.renderer2.appendChild(this.animateThis!.nativeElement, textScript);

        const srcScript = this.renderer2.createElement('script');
        srcScript.type = 'text/javascript';
        srcScript.text = `
      (function() {
        console.log('Hello from Siberia!')
      }());
    `;
        this.renderer2.appendChild(this.document.body, srcScript);

    }

}
