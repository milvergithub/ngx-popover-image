# ngx-popover-image
![angular 4 popover-image](https://raw.githubusercontent.com/milvergithub/ngx-popover-image/master/resource/demo.png)
## Installation

To install this library, run:

```bash
$ npm install ngx-popover-image --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-popover-image
```

and then from your Angular `AppModule`:

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ViewChild} from '@angular/core';
import {Component} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {PopoverLucyModule} from 'ngx-popover-image';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
class AppComponent {

    @ViewChild('popoverImage') popoverImage: NgxPopoverImageComponent;
    image = 'http://reneemullingslewis.com/wp-content/uploads/2014/08/woman-smiling.png';
    constructor() {
    }

    evento() {
        this.popoverImage.openPopover();
    }
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, PopoverLucyModule]
})
class AppModule {
}
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
    <button (click)="evento()" class="btn btn-sm btn-success">open click</button>
    <button [ngxPopoverImage]="popoverImage" class="btn btn-sm btn-success">open hover</button>
    </div>
    <app-ngx-popover-image #popoverImage
                           [image]="image"
                           [modal]="true">
        <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b>
        <span style="color: #C21F39">A aliquam autem</span>
        <span style="color: #00b3ee">beatae commodi</span>
        labore magnam magni mollitia natus rem saepe?
        <b><i><span style="color: #ffc520">PopoverDirective With</span></i></b>
        <small>Consequuntur cum deleniti deserunt earum error nesciunt quae vel vitae.</small>
        .
        Click outside of this popover and it will be dismissed automatically.
        <button class="btn btn-primary" (click)="popoverImage.closePopover()">close</button>
    </app-ngx-popover-image>
```
### Options
* image: source image url
* modal: default value **false**, if is **true** display mode modal block background.
## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Milver Flores Acevedo](mailto:mfflowg@gmail.com)
