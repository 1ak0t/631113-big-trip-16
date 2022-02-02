import AbstractView from './abstract-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import {MINUTES_IN_HOUR, MINUTES_IN_DAY} from '../utils/utils';

const getPointTypes = (points) => {
  const types = [];
  points.forEach((point) => types.push(point.type));
  return [...new Set(types)];
};

const getPriceOfType = (points, types) => {
  const prices = [];
  types.forEach((type) => {
    let cost = 0;
    points.filter((point) => point.type === type).map((pointOfType) => {
      cost += pointOfType.price;
    });
    prices.push(cost);
  });
  return prices;
};

const getCountOfType = (points, types) => {
  const counts = [];
  types.forEach((type) => {
    let count = 0;
    points.filter((point) => point.type === type).map(() => count++);
    counts.push(count);
  });
  return counts;
};

const getDurationOfType = (points, types) => {
  const counts = [];
  types.forEach((type) => {
    let minutes = 0;
    points.filter((point) => point.type === type).map((pointOfType) => {
      minutes += dayjs(pointOfType.dateTo).diff(dayjs(pointOfType.dateFrom), 'minute');
    });
    counts.push(minutes);
  });
  return counts;
};

const getFormatedTime = (diffMinutes) => {
  if (diffMinutes < MINUTES_IN_HOUR) {
    return dayjs.duration(diffMinutes, 'minute').format('mm[M]');
  }
  if (diffMinutes < MINUTES_IN_DAY && diffMinutes >= MINUTES_IN_HOUR) {
    return dayjs.duration(diffMinutes, 'minute').format('HH[H] mm[M]');
  }
  return dayjs.duration(diffMinutes, 'minute').format('DD[D] HH[H] mm[M]');
};

const renderMoneyChart = (types, costOfType, place) => (
  new Chart(place, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types.map((type) => type.toUpperCase()),
      datasets: [{
        data: costOfType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const renderTypeChart = (types, countOfType, place) => (
  new Chart(place, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types.map((type) => type.toUpperCase()),
      datasets: [{
        data: countOfType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const renderDurationChart = (types, countOfType, place) => (
  new Chart(place, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types.map((type) => type.toUpperCase()),
      datasets: [{
        data: countOfType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 100,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${getFormatedTime(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const createStatisticsTemplate = () => (`<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>`);

export default class StatisticsView extends AbstractView {
  _data = {};

  constructor(points) {
    super();

    this._data = points;
  }

  get template() {
    return createStatisticsTemplate();
  }

  setCharts = () => {
    const BAR_HEIGHT = 55;
    const moneyCtx = document.querySelector('#money');
    const typeCtx = document.querySelector('#type');
    const timeCtx = document.querySelector('#time');

    const currentTypes = getPointTypes(this._data);

    moneyCtx.height = BAR_HEIGHT * currentTypes.length;
    typeCtx.height = BAR_HEIGHT * currentTypes.length;
    timeCtx.height = BAR_HEIGHT * currentTypes.length;

    renderMoneyChart(currentTypes,getPriceOfType(this._data, currentTypes), moneyCtx);
    renderTypeChart(currentTypes,getCountOfType(this._data, currentTypes), typeCtx);
    renderDurationChart(currentTypes,getDurationOfType(this._data, currentTypes), timeCtx);
  }
}
