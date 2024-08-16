import { memo, ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = ({
  loadNext,
  children,
}: {
  loadNext: () => void;
  children: ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    loadNext();

    const loadItems = async () => {
      setLoading(true);

      await loadNext();

      setLoading(false);
    };

    loadItems();
  }, [loadNext, page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  return (
    <>
      {children}
      <tr className="block" ref={ref}>
        {loading && <td>Loading...</td>}
      </tr>
    </>
  );
};

export default memo(InfiniteScroll);
