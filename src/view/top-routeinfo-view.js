const createRouteInfoTemplate = (points) => {
  const tripCities = [];
  let tripTotalPrice = 0;
  points.forEach((point) => {
    tripCities.push(point.destination.name);
    tripTotalPrice += point.price;
  });

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripCities.join(' &mdash; ')}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotalPrice}</span>
    </p>
  </section>`;
};

export {createRouteInfoTemplate};
