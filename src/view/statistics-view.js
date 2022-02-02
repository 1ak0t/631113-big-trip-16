import AbstractView from './abstract-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import {getFormatedTime} from '../utils/utils';

const BAR_HEIGHT = 55;

const getPointTypes = (points) => {
  const types = [];
  points.forEach((point) => types.push(point.type));
  return [...new Set(types)];
};

const getStatistics = (points) => {
  const types = getPointTypes(points);
  const prices = [];
  const counts = [];
  const durations = [];

  types.forEach((type) => {
    let cost = 0;
    let count = 0;
    let minutes = 0;
    points.filter((point) => point.type === type).forEach((pointOfType) => {
      cost += pointOfType.price;
      count++;
      minutes += dayjs(pointOfType.dateTo).diff(dayjs(pointOfType.dateFrom), 'minute');
    });
    prices.push(cost);
    counts.push(count);
    durations.push(minutes);
  });

  return {
    types: types,
    prices: prices,
    counts: counts,
    durations: durations,
  };
};

const chartsFormatter = {
  money: (value) => `€ ${value}`,
  type: (value) => `${value}x`,
  time: (value) => `${getFormatedTime(value)}`,
};

const getChartsConfig = (types, data, title, formatter) => ({
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: types.map((type) => type.toUpperCase()),
    datasets: [{
      data: data,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
      barThickness: 44,
      minBarLength: 85,
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
        formatter: formatter,
      },
    },
    title: {
      display: true,
      text: title,
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
});

const renderMoneyChart = (types, typesCosts, place) => new Chart(place, getChartsConfig(types, typesCosts, 'MONEY', chartsFormatter.money));
const renderTypeChart = (types, typesCounts, place) => new Chart(place, getChartsConfig(types,typesCounts, 'TYPE', chartsFormatter.type));
const renderDurationChart = (types, typesDurations, place) => new Chart(place, getChartsConfig(types, typesDurations, 'TIME', chartsFormatter.time));

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
  #data = {};
  #statistics = null;

  constructor(points) {
    super();

    this.#data = points;
    this.#statistics = getStatistics(this.#data);
  }

  get template() {
    return createStatisticsTemplate();
  }

  setCharts = () => {
    const chartsHeight = BAR_HEIGHT * this.#statistics.types.length;
    const moneyCtx = document.querySelector('#money');
    const typeCtx = document.querySelector('#type');
    const timeCtx = document.querySelector('#time');

    moneyCtx.height = chartsHeight;
    typeCtx.height = chartsHeight;
    timeCtx.height = chartsHeight;

    renderMoneyChart(this.#statistics.types, this.#statistics.prices, moneyCtx);
    renderTypeChart(this.#statistics.types, this.#statistics.counts, typeCtx);
    renderDurationChart(this.#statistics.types, this.#statistics.durations, timeCtx);
  }
}
