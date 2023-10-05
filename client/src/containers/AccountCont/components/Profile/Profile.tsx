<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
import { useCountryFlagUrl } from '@/hooks/useCountryFlag';
import { profileAPI } from '@/store/services/ProfileService';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React, { useEffect, useMemo } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const HEAD_LINK = '/account';

const Profile = () => {
  const { data: profile } = profileAPI.useGetProfileQuery();
  const { t } = useTranslation();

  const flagUrl = useCountryFlagUrl(profile?.country);

  useEffect(() => {
    if (profile) {
      const userId = profile._id;
      Cookies.set('userId', userId, { expires: 30 });
    }
  }, [profile]);

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
<<<<<<< HEAD
=======
=======
import { useCountryFlagUrl } from '@/hooks/useCountryFlag';
>>>>>>> 266d9e0 (add profile editor)
import { profileAPI } from '@/store/services/ProfileService';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
=======
>>>>>>> a40623b (add messages logic)
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const HEAD_LINK = '/account';

const Profile = () => {
<<<<<<< HEAD
  const { data } = profileAPI.useGetProfileQuery();
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
=======
  const { data: profile } = profileAPI.useGetProfileQuery();
>>>>>>> 431f668 (dev leagues)
  const { t } = useTranslation();
>>>>>>> 590496a (todo on server)

  const flagUrl = useCountryFlagUrl(profile?.country);

  useEffect(() => {
    if (profile) {
      const userId = profile._id;
      Cookies.set('userId', userId, { expires: 30 });
    }
  }, [profile]);

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
=======
>>>>>>> main

  return (
    <section className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
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
            <Link to={`${HEAD_LINK}/edit`} className={styles.editing}>
              {t('edit profile')}
            </Link>
          </div>
<<<<<<< HEAD
=======
        <span className={styles.title}>{t('My profile')}</span>
        <div className={styles.photoWrapper}>
          <img src={data?.avatarUrl} alt="avatar" className={styles.photo} />
        </div>
        <div className={styles.ageWrap}>
          <div className={styles.title}>{t('Age')}</div>
          <span>{data?.fullName}</span>
          <div className={styles.title}>{t('Country')}</div>
          <span>{data?.country}</span>
>>>>>>> 8673b67 (add server and start auth)
=======
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
            <Link to={`${HEAD_LINK}/edit`} className={styles.editing}>
              {t('edit profile')}
            </Link>
          </div>
>>>>>>> 266d9e0 (add profile editor)
=======
>>>>>>> main
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
