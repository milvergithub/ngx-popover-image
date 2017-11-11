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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library on main module `PopoverLucyModule.forRoot()` and  `PopoverLucyModule` child module
import { PopoverLucyModule } from 'ngx-popover-image';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    PopoverLucyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<popover-content #myPopover 
                 placement="auto"
                 [image]="image"
                 [animation]="true"
                 [closeOnClickOutside]="false" >
  Sed posuere consectetur est at lobortis. Aenean eu leo quam.
  Pellentesque ornare sem lacinia quam venenatis vestibulum.
</popover-content>
<button [popoverImage]="myPopover" class="btn btn-success">open popover</button>
```

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
