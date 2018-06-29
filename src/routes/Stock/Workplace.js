import React, { PureComponent } from 'react';
// 组件定义
import G2 from '@antv/g2';
import { message } from 'antd';
import * as Service from '../../services/api';

export default class Workplace extends PureComponent {
  componentDidMount() {
    Service.queryStockDataTest().then((data) => {
      console.info(2222, data);
      if (data) {
        this.renderG6Graph(data);
      } else {
        message.error('有问题');
      }
    });
  }

  componentDidUpdate() {
    Service.queryStockDataTest().then((data) => {
      if (data) {
        this.renderG6Graph(data);
      } else {
        message.error('有问题');
      }
    });
  }

  renderG6Graph = (data) => {
    const chart = new G2.Chart({
      id: 'mountNode',
      forceFit: true,
      height: window.innerHeight,
      padding: 20,
      animate: false,
    });
    // 获取当前月的第几周,从 0 开始
    function getMonthWeek(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthFirst = new Date(year, month, 0);
      const intervalDays = Math.round((date.getTime() - monthFirst.getTime()) / 86400000);
      const index = Math.round((intervalDays + monthFirst.getDay()) / 7);
      return index;
    }
    // 加工数据
    // 增加涨幅、跌幅
    // 添加所属月、周几、每个月的第几周
    data.forEach((obj) => {
      const date = new Date(obj['日期']);
      const month = date.getMonth();
      obj.month = month;
      obj.day = date.getDay().toString();
      obj.week = getMonthWeek(date).toString();
    });

    const defs = {
      month: {
        type: 'cat',
        values: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
      },
      day: {
        type: 'cat',
      },
      week: {
        type: 'cat',
        values: [ '5', '4', '3', '2', '1', '0' ],
      },
      涨跌幅: {
        type: 'linear',
        sync: true,
        min: -10,
        max: 10,
      },
      time: {
        type: 'time',
      },
    };
    // chart.axis(false);
    chart.source(data, defs);
    chart.facet('list', {
      fields: [ 'month' ],
      cols: 3,
      padding: 10,
      eachView(view) {
        view.polygon().position('day*week')
          .color('涨跌幅', '#006837-#ffffbf-#d73027')
          .style({
            lineWidth: 1,
            stroke: '#999',
          })
          .tooltip('日期*涨跌幅');
      },
    });
    chart.render();
  };

  render() {
    return (
      <div id="mountNode" />
    );
  }
}
