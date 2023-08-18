import { useCountryFlagUrl } from '@/hooks/useCountryFlag';
import { profileAPI } from '@/store/services/ProfileService';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const Profile = () => {
  const { data } = profileAPI.useGetProfileQuery();
  const { t } = useTranslation();

  const flagUrl = useCountryFlagUrl(data?.country);

  const calculateAge = useMemo(
    () => (birthDate: string | undefined) => {
      const currentDate = dayjs();
      const birth = dayjs(birthDate);
      const age = currentDate.diff(birth, 'year');
      return age;
    },
    []
  );

  const age = calculateAge(data?.birthDate);
  const headLink = '/account';

  return (
    <section className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
        <span className={styles.text}>{t('My profile')}</span>
        <div className={styles.photoWrapper}>
          <img src={data?.avatarUrl} alt="avatar" className={styles.photo} />
        </div>
        <div className={styles.profileData}>
          <span className={styles.text}>{data?.fullName}</span>
          <div className={styles.age}>
            <span className={styles.text}>{age} years</span>
            {flagUrl && <img src={flagUrl} alt="Flag of Argentina" className={styles.flag} />}
          </div>
          <div className={styles.editingWrap}>
            <Link to={`${headLink}/edit`} className={styles.editing}>
              edit profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
