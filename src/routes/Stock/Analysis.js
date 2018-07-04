import React, { PureComponent } from 'react';
// 组件定义
import G6 from '@antv/g6';
import * as Service from '../../services/aZero';

export default class Analysis extends PureComponent {
  componentDidMount() {
    this.renderG6Graph();
    Service.queryAZeroData().then((res) => {
      console.info(11111, res);
    });
    Service.queryAZeroStreamData().then((res) => {
      console.info(2222, res);
    });
  }

  componentDidUpdate() {
    this.renderG6Graph();
  }

  renderG6Graph = () => {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200,
      }, {
        id: 'node2',
        x: 300,
        y: 200,
      }],
      edges: [{
        id: 'edge1',
        target: 'node2',
        source: 'node1',
      }],
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 500,
      height: 500,
    });
    graph.read(data);
  };

  render() {
    return (
      <div id="mountNode" />
    );
  }
}
