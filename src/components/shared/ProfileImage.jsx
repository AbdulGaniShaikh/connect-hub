import { useIsVisible } from 'hooks/useIsVisible';
import { useEffect, useRef, useState } from 'react';
import { imageService } from 'service';
import { user } from 'assets/icons';
import Skeleton from 'react-loading-skeleton';

const ProfileImage = ({ id = '', height = 'circleImage', width = 'circleImage' }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);
  const isImageVisible = useIsVisible(imageRef);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await imageService.get(id);
        setImage(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id === '') return;
    fetchImage();
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await imageService.get(id);
        setImage(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!isImageVisible) return;
    if (id === '') return;
    if (image !== null) return;
    fetchImage();
  }, [isImageVisible, image, id]);
  return (
    <div
      ref={imageRef}
      className={`h-${height} w-${width} aspect-square rounded-full overflow-hidden flex items-center justify-center`}
    >
      {loading && <Skeleton circle height={300} width={300} />}
      {!loading && <img src={id ? image : user} alt="" className="object-cover aspect-square" />}
    </div>
  );
};

export default ProfileImage;
