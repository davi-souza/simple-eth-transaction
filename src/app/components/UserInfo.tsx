import { FC, useCallback, useEffect, useState } from 'react';
import { LoadingDiv, Div } from '../../styles/userInfoComponent';
import QRCode from 'qrcode';
import { AppUser } from '../../types';

const UserInfo: FC<{
  user: AppUser | null;
  loading: boolean;
}> = ({ user, loading }) => {
  const [qrcodeSrc, setQrcodeSrc] = useState<string>('');

  useEffect(() => {
    if (user !== null) {
      QRCode.toDataURL(user.address).then(setQrcodeSrc);
    }
  }, [user, setQrcodeSrc]);

  const copyToClipboard = useCallback(() => {
    if (user !== null) {
      navigator.clipboard.writeText(user.address);
    }
  }, [user]);

  return loading ? (
    <LoadingDiv>Loading...</LoadingDiv>
  ) : (
    user && (
      <Div>
        <div>
          Hello, <span id="user-username">{user.username}</span>
        </div>
        <img id="user-address-qrcode" src={qrcodeSrc} />
        <div id="user-address-text">
          {user.address}
          <button onClick={copyToClipboard}>COPY</button>
        </div>
      </Div>
    )
  );
};

export default UserInfo;
