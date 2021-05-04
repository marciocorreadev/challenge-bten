import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name = 'Angular';

  private myChart: any = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.InitPipe();
  }

  async logout(  ) {
    localStorage.removeItem('TOKEN');
    this.router.navigateByUrl('/login');
  }

  showPassword = true;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword)
  }

  private InitPipe(): void {
    this.myChart = echarts.init((document.getElementById('pipe')) as any);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        //selectedMode: false,
        orient: 'vertical',
        x: 'left',
        data: ['elem1', 'elem2', 'elem3', 'elem4', 'elem5']
      },
      series: [
        {
          name: 'NOMBRE',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'elem1' },
            { value: 310, name: 'elem2' },
            { value: 234, name: 'elem3' },
            { value: 135, name: 'elem4' },
            { value: 1548, name: 'elem5' }
          ]
        }
      ]
    };

    this.myChart.setOption(option);

  }


  OnElem1Click() {
    console.log("OnElem1Click");
    this.myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 1
    });
  }

  OnElem1Mouseover() {
    console.log("OnElem1Mouseover");
    this.myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 1
    });
  }

  OnElem1Mouseout() {
    console.log("OnElem1Mouseout");
    this.myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: 1
    });
  }

  OnElem2Mouseover() {
    console.log("OnElem2Mouseover");
    this.myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 2
    });
  }

  OnElem2Mouseout() {
    console.log("OnElem2Mouseout");
    this.myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: 2
    });
  }

}
