export default function AboutPage() {
  const cafeName = () => {
    return (
      <nobr>
        <strong>WallStreet</strong>
      </nobr>
    );
  };

  return (
    <>
      <div className="section container">
        <div className="article">
          <article>
            <h1>О бирже</h1>
            <h2 className="title is-size-5 mb-2">CafeTrade</h2>
            <p>
              Кофейная биржа <strong>CafeTrade</strong> – это программа
              лояльности кафе <strong>WallStreet</strong>, расположенного по
              адресу г. Владивосток, ул Мордовцева, 6.{' '}
              <strong>CafeTrade</strong> – это возможность для посетителя самому
              управлять размером скидки на продукцию кафе{' '}
              <strong>WallStreet</strong>, для которой в прейскуранте на сайте{' '}
              <a href="https://wallstreetvl.ru/menu">wallstreetvl.ru/menu</a>{' '}
              указана цена в <strong>Wall Street Монетах</strong>.
            </p>

            <h2 className="title is-size-5 mb-2">WSM</h2>

            <p>
              <strong>WallStreet Монеты (WSM)</strong> – это цифровой товар кафе{' '}
              {cafeName()} по адресу г. Владивосток, ул. Мордовцева, 6. Данный
              товар предназначен только для обмена на продукцию кафе{' '}
              {cafeName()}, согласно текущему прейскуранту на день обмена,
              опубликованному на сайте{' '}
              <a href="https://wallstreetvl.ru/menu">wallstreetvl.ru/menu</a>{' '}
              &nbsp;
            </p>

            <h2 className="title is-size-5 mb-2">Стоимость WSM</h2>
            <p>
              <strong>Стоимость WSM</strong> публикуется на главной странице
              биржи и на зависит от курса к рублю, который меняется ежедневно в
              случайном порядке в определенном диапазоне. Максимальная стоимость{' '}
              <strong>1000 WSM = 1000 руб.</strong> Минимальная стоимость{' '}
              <strong>1000 WMS = 700 руб. (коффициент 0.70).</strong> При этом
              скидка (экономия для покупателя) при обмене WSM на продукицю кафе{' '}
              {cafeName()} составит <strong>300 руб.</strong>
            </p>

            <h2 className="title is-size-5 mb-2">Выгода для клиента кафе</h2>
            <p>
              <strong>Наибольшая выгода</strong> от использования{' '}
              <strong>WallStreet Монет</strong> для посетителя кафе появляется
              при покупке WSM на сайте биржи{' '}
              <a href="https://cafetrade.wallstreetvl.ru">
                cafetrade.wallstreetvl.ru
              </a>{' '}
              <strong>в день их минимальной стоимости</strong>. При этом
              потратить WSM (обменять на продукцию кафе {cafeName()}) полностью
              или частично, посетитель может в любой день при посещении кафе.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
