import s from './ProductPage.module.scss';
import { Typography } from '../../components/UI/Typography';
import Button from '../../components/UI/Button';

function ProductPage() {
  return (
    <main>
      <div className={s.grid}>
        <div className={s.sliderBlock}>
          <div className={s.sliderImage}></div>
          <div className={s.saleBlock}>
            <Typography variant={'h4'} className={s.saleText}>
              Sale
            </Typography>
          </div>
        </div>
        <div className={s.contentBlock}>
          <div className={s.wrapper}>
            <Typography variant={'h2'} className={s.h2}>
              Rosy Delight
            </Typography>
            <div className={s.priceBlock}>
              <Typography variant={'h3'}>85 €</Typography>
              <Typography variant={'h4'} className={s.h4}>
                90 €
              </Typography>
            </div>
            <div className={s.descriptionBlock}>
              <div>
                <Typography variant={'body'} className={s.subtitle}>
                  Product description:
                </Typography>
                <Typography variant={'body'}>
                  Large exceptional bouquet composed of a selection of David Austin roses, known for
                  their beauty and subtle fragrance. The bouquet is accompanied by seasonal foliage
                  which will enhance these sublime flowers even.
                </Typography>
              </div>
              <div>
                <Typography variant={'body'} className={s.subtitle}>
                  Composition:
                </Typography>
                <Typography variant={'body'}>Roses, alstroemerias, peony roses.</Typography>
              </div>
              <div className={s.sizeBlock}>
                <Typography variant={'body'} className={s.subtitle}>
                  Size:
                </Typography>
                <Typography variant={'body'}>L</Typography>
              </div>
            </div>
            <Button className={s.button}>Add to cart</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
