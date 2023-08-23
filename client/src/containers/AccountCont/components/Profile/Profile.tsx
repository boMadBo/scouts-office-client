import { useCountryFlagUrl } from '@/hooks/useCountryFlag';
import { profileAPI } from '@/store/services/ProfileService';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const headLink = '/account';

const Profile = () => {
  const { data: profile } = profileAPI.useGetProfileQuery();
  const { t } = useTranslation();

  const flagUrl = useCountryFlagUrl(profile?.country);

  const calculateAge = useMemo(
    () => (birthDate: string | undefined) => {
      const currentDate = dayjs();
      const birth = dayjs(birthDate);
      const age = currentDate.diff(birth, 'year');
      return age;
    },
    []
  );

  const age = calculateAge(profile?.birthDate);

  return (
    <section className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
        <span className={styles.text}>{t('My profile')}</span>
        <div className={styles.photoWrapper}>
          {profile?.avatarUrl && <img src={profile.avatarUrl} alt="avatar" className={styles.photo} />}
          {!profile?.avatarUrl && (
            <div className={styles.noPhotoWrapper}>
              <span className={styles.noPhoto}>{t('Your photo')}</span>
            </div>
          )}
        </div>
        <div className={styles.profileData}>
          <span className={styles.text}>{profile?.fullName}</span>
          <div className={styles.age}>
            <span className={styles.text}>{age} years</span>
            {flagUrl && <img src={flagUrl} alt="Flag" className={styles.flag} />}
          </div>
          <div className={styles.editingWrap}>
            <Link to={`${headLink}/edit`} className={styles.editing}>
              {t('edit profile')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
