import '../../styles/App.scss';
import { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import getDataApi from '../../services/Api';
import Preview from '../card/Preview';
import Design from '../form/Design';
import Stuffed from '../form/Stuffed';
import Share from '../form/Share';
import Avatar from '../../images/cat.jpg';
import ls from '../../services/localStorage';
function Card() {
  const [data, setData] = useState(
    ls.get('data', {
      name: '',
      job: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      palette: '1',
      photo: Avatar,
    })
  );

  const [dataAPI, setDataAPI] = useState({});
  const [disable, setDisable] = useState('');
  const [sectionShare, setSectionShare] = useState('hiddenTwitter');

  const [classCollapsible, setClassCollapsible] = useState({
    design: '',
    stuffed: 'hidden',
    share: 'hidden',
  });

  const handleReset = (cleanedData) => {
    setData(cleanedData);

    setSectionShare('hiddenTwitter');
    ls.remove('data');
  };

  const handleCollapsible = (id) => {
    const idClass = id;

    const overallCollapsables = {
      stuffed: 'hidden',
      share: 'hidden',
      design: 'hidden',
    };
    if (idClass === 'design') {
      if (classCollapsible.design === 'hidden') {
        const designCollapsable = {
          stuffed: 'hidden',
          share: 'hidden',
          design: '',
        };
        setClassCollapsible(designCollapsable);
      } else {
        setClassCollapsible(overallCollapsables);
      }
    }
    if (idClass === 'stuffed') {
      if (classCollapsible.stuffed === 'hidden') {
        const stuffedCollapsable = {
          stuffed: '',
          share: 'hidden',
          design: 'hidden',
        };
        setClassCollapsible(stuffedCollapsable);
      } else {
        setClassCollapsible(overallCollapsables);
      }
    }
    if (idClass === 'share') {
      if (classCollapsible.share === 'hidden') {
        const shareCollapsable = {
          stuffed: 'hidden',
          design: 'hidden',
          share: '',
        };
        setClassCollapsible(shareCollapsable);
      } else {
        setClassCollapsible(overallCollapsables);
      }
    }
  };

  const handleCreateCard = (ev) => {
    // Se ejecutaba en esta funcion
    // Que se quite el hidden de la seccion tarjeta creada
    getDataApi(data).then((response) => {
      setDisable('disable');
      setDataAPI(response);
    });
    setSectionShare('');
  };

  const handleInput = (value, name) => {
    setData({ ...data, [name]: value });

    ls.set('data', { ...data, [name]: value });
  };

  const handleImage = (photo) => {
    setData({ ...data, photo });
    ls.set('data', { ...data, photo });
  };

  // Función twitter
  function shareOnTwitter(event) {
    event.preventDefault();
    let url = `https://twitter.com/intent/tweet?text=He%20creado%20una%20tarjeta%20profesional.%20Conóceme!%20&url=${dataAPI.cardURL}`;
    window.location.href = url;
  }
  return (
    <>
      <div className="createpage">
        <Header />
        <div className="createwrapper">
          <Preview
            reset={handleReset}
            data={data}
            collapsibleAll={setClassCollapsible}
            disable={setDisable}
          />
          <form className="form" action="/signup" method="post">
            <Design
              data={data}
              handleInput={handleInput}
              handleCollapsible={handleCollapsible}
              classCollapsible={classCollapsible}
            />
            <Stuffed
              data={data}
              handleInput={handleInput}
              handleCollapsible={handleCollapsible}
              classCollapsible={classCollapsible}
              photo={data.photo}
              handleImage={handleImage}
            />
            <Share
              disable={disable}
              data={data}
              handleCreateBtn={handleCreateCard}
              handleCollapsible={handleCollapsible}
              classCollapsible={classCollapsible}
              shareOnTwitter={shareOnTwitter}
              dataApi={dataAPI}
              sectionShare={sectionShare}
            />
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Card;
