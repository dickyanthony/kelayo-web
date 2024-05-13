import Carousel from 'react-carousel';

export default function CustomCarousel(props) {
  const { listImage = [], title, onChange = () => {}, onClickItem = () => {} } = props;
  <Carousel onChange={onChange} onClickItem={onClickItem} showArrows={false} showThumbs={false}>
    {listImage.map((x) => (
      <div>
        <img src={x} />
        <p className="legend">{title}</p>
      </div>
    ))}
  </Carousel>;
}
