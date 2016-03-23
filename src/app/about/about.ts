import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  template: `<div class="tempView">
    <table>
      <thead>
        <th>Name</th>
        <th>Fullname</th>
        <th>more_column</th>
        <th>more_column2</th>
        <th>more_column3</th>
        <th>more_column4</th>
        <th>more_column5</th>
        <th>more_column6</th>
        <th>more_column7</th>
      </thead>
      <tbody>        
        <tr *ngFor="#item of data.result">
          <td><span class="{{item.id % 2 ? 'even' : 'odd'}}">{{item.test_data}}</span></td>
          <td>{{item.raw_data}}</td>
          <td>{{item.more_column}}</td>
          <td>{{item.more_column2}}</td>
          <td>{{item.more_column3}}</td>
          <td>{{item.more_column4}}</td>
          <td>{{item.more_column5}}</td>
          <td>{{item.more_column6}}</td>
          <td>{{item.more_column7}}</td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: [`div.tempView {
  padding: 0px 20px;
}

  div.tempView span {
    float:left;
    padding: 5px;
    margin: 2px;
    display: block;
  }

  div.tempView span.odd {
    background: red;
    color: #fff;
  }

  div.tempView span.even {
        background: deepskyblue;
        color: #fff;
  }`]
})
export class About {
  data = {};
  constructor(http: Http) {
    http.get("http://localhost:59284/Home/GetData")
    .map(res => res.json())
    .subscribe(data => this.data = data);
  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    var mockData = require('assets/mock-data/mock-data.json');
    console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
  }

  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    setTimeout(() => {

      let asyncDataPromise = asyncMockDataPromiseFactory();
      asyncDataPromise.then(json => {
        console.log('async mockData', json);
      });

    });
  }

}
