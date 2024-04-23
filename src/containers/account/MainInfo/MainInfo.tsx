import { IProfileValues } from '@/containers/account/types';
import { countryAPI } from '@/store/services/CountryService';
import EditButton from '@/uikit/buttons/EditButton';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './mainInfo.module.scss';

interface Props {
  profile: IProfileValues;
  onClick: () => void;
}

const MainInfo = ({ profile, onClick }: Props) => {
  const { data: flagUrl } = countryAPI.useGetFlagQuery({ country: profile.country });
  const { t } = useTranslation();

  const calculateAge = useCallback((birthDate: string | undefined) => {
    const currentDate = dayjs();
    const birth = dayjs(birthDate);
    return currentDate.diff(birth, 'year');
  }, []);

  const age = calculateAge(profile?.birthDate);

  return (
    <div className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
        <div className={styles.capWrap}>
          <span className={styles.text}>{t('My profile')}</span>
          <div className={styles.photoWrapper}>
            {profile?.avatar && <img src={profile.avatar} alt="avatar" className={styles.photo} />}
            {!profile?.avatar && (
              <div className={styles.noPhotoWrapper}>
                <span className={styles.noPhoto}>{t('Your photo')}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.profileData}>
          <span className={styles.text}>{profile?.name}</span>
          <div className={styles.age}>
            <span className={styles.text}>{age} years</span>
            {flagUrl && <img src={flagUrl.flag} alt="Flag" className={styles.flag} />}
          </div>
          <div className={styles.editingWrap}>
            <EditButton onClick={onClick} text={t('edit profile')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainInfo);
