import { Table } from '../../../../components';

export default (props) => {
  const [touristDestinationList, setTouristDestinationList] = useState({
    totalData: 0,
    totalPage: 0,
    listData: [],
  });

  const [loading, setLoading] = useState(false);

  const signal = useRef();
  useEffect(() => {
    getList();
  }, [selected]);

  const createBlobURL = (imageData) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const getList = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();
    setLoading(true);
    const params = {};
    if (selected !== 'lainnya') params.type = selected;
    let maxPrice = 0;

    getListTouristDestinationAPI(params, signal.current?.signal)
      .then((res) => {
        const modifiedListData = res.listData.map((item) => {
          const newItem = { ...item };

          if (item.image1) {
            newItem.image1 = createBlobURL(item.image1.data);
          }

          return newItem;
        });
        if (modifiedListData.length > 0) {
          maxPrice = res.listData.reduce(function (prev, current) {
            return prev && prev.price > current.price ? prev : current;
          }).price;
          console.log('max==>', maxPrice);
        }
        setTouristDestinationList({
          totalPage: res.totalPage,
          totalData: res.totalData,
          listData: modifiedListData,
        });
      })
      .then(() => setPrice({ min: 0, max: maxPrice }))
      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return <Table />;
};
