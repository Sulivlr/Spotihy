import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';

const ArtistList = () => {
  return (
    <Grid container spacing={3} sx={{padding: 2}}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            '&:hover': {transform: 'scale(1.03)'},
          }}
        >
          <CardMedia
            component="img"
            alt="Jungkook"
            height="300"
            image="https://static.wixstatic.com/media/13b3fd_7775b0e8749942eb8e88de0227312656~mv2.jpeg/v1/fill/w_568,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/13b3fd_7775b0e8749942eb8e88de0227312656~mv2.jpeg"
            sx={{borderRadius: '4px 4px 0 0'}}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: '#333',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Jungkook
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            '&:hover': {transform: 'scale(1.03)'},
          }}
        >
          <CardMedia
            component="img"
            alt="Jimin"
            height="300"
            image="https://media.cnn.com/api/v1/images/stellar/prod/230303121204-01-jimin-tiffany-and-co.jpg?c=original"
            sx={{borderRadius: '4px 4px 0 0'}}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: '#333',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Jimin
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            '&:hover': {transform: 'scale(1.03)'},
          }}
        >
          <CardMedia
            component="img"
            alt="Rose"
            height="300"
            image="https://www.allkpop.com/upload/2024/10/content/201511/web_data/allkpop_1729451696_rose-bruno-mars.jpg"
            sx={{borderRadius: '4px 4px 0 0'}}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: '#333',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Rose
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            '&:hover': {transform: 'scale(1.03)'},
          }}
        >
          <CardMedia
            component="img"
            alt="Ji Chang Wook"
            height="300"
            image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2021/01/20/2c34a300-54a6-11eb-84b3-e7426e7b8906_image_hires_181302.jpg?itok=X7VpWPA5&v=1611137590"
            sx={{borderRadius: '4px 4px 0 0'}}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: '#333',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Ji Chang Wook
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ArtistList;
