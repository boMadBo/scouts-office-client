import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './photoDownloader.module.scss';

interface Props {
  previewUrl: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoDownloader = ({ onChange, previewUrl }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.avatarWrap}>
      <div className={styles.inputWrap}>
        <span className={styles.text}>{t('Your avatar')}</span>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          id="fileInput"
          onChange={onChange}
          className={styles.inputDate}
        />
        <div className={styles.labelWrap}>
          <div className={styles.fakeLabel}>
            <label htmlFor="fileInput" className={styles.label}>
              <span>{t('Choose file')}</span>
            </label>
          </div>
        </div>
      </div>
      {previewUrl && (
        <div className={styles.image}>
          <img src={previewUrl} alt="Preview" className={styles.img} />
        </div>
      )}
    </div>
  );
};

export default React.memo(PhotoDownloader);
