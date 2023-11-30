import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, TextField, Button } from '@mui/material';
const teamMembers = [
    { name: 'John Doe', title: 'CEO', image: '/path/to/image' },
    // Add more team members here...
];

const AboutUs = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Meet the Team
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={member.name}
                                    height="140"
                                    image={member.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h4" component="h2" gutterBottom>
                    Contact Us
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField id="name" label="Name" variant="outlined" fullWidth margin="normal" />
                    <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" />
                    <TextField id="message" label="Message" variant="outlined" fullWidth multiline rows={4} margin="normal" />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AboutUs;