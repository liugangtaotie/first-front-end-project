import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    return (
      <div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
        <div>一切事情,物来则应,过去不留</div>
      </div>
    );
  }
}
