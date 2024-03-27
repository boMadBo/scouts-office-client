import { useCountryFlagUrl } from '@/hooks/useCountryFlag';
import { profileAPI } from '@/store/services/ProfileService';
import EditButton from '@/uikit/buttons/EditButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';

//TODO: добавить интерфейсы
const headLink = '/account';

const Profile = () => {
  const { data: profile } = profileAPI.useGetProfileQuery();
  const { t } = useTranslation();
  const navigate = useNavigate()
  const flagUrl = useCountryFlagUrl(profile?.country);

  useEffect(() => {
    if (profile) {
      const userId = profile.id;
      Cookies.set('userId', userId.toString(), { expires: 30 }); TODO: 'change'
    }
  }, [profile]);

  const calculateAge = useMemo(
    () => (birthDate: string | undefined) => {
      const currentDate = dayjs();
      const birth = dayjs(birthDate);
      return currentDate.diff(birth, 'year');
    },
    []
  );

  const age = calculateAge(profile?.birthDate);

  return (
    <section className={styles.profileConteiner}>
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
            {flagUrl && <img src={flagUrl} alt="Flag" className={styles.flag} />}
          </div>
          <div className={styles.editingWrap}>
            <EditButton onClick={()=>navigate(`${headLink}/edit`)} text={t('edit profile')}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
