import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import AdminAdd from '../../components/admin-add/admin-add-trace';
import AdminAddOutbreak from '../../components/admin-add/admin-add-outbreak';
import AdminDelete from '../../components/admin-delete/admin-delete-trace';
import AdminDeleteOutbreak from '../../components/admin-delete/admin-delete-outbreak';
import PageHeading from '../../components/page-heading/PageHeading';
import { variants, transitions } from '../motion-settings';
import './admin-page.css';
import { Hidden } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function AdminPage(props) {
  const vert = isWidthUp('md', props.width) ? 'vertical' : 'horizontal';
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const heading = 'Admin Page';
  const subheading = (
    <>
      <p>Welcome, {props.user}</p>
    </>
  );
  const body = <></>;
  const pageHeadingData = { heading, subheading, body };

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='initial'
      variants={variants}
      transition={transitions}
    >
      <div>
        <PageHeading data={pageHeadingData} />
      </div>
      <div className='root'>
        <br />
        <br />
        <br />

        <div className='tabRoot'>
          <div className='leftMenu'>
            <Tabs
              orientation={vert}
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              className={classes.tabs}
              indicatorColor='primary'
            >
              <Tab label='Add a New Trace Location' {...a11yProps(0)} />
              <Tab label='Delete a Trace(s)' {...a11yProps(1)} />
              <Tab label='Add a New Outbreak' {...a11yProps(2)} />
              <Tab label='Delete an Outbreak(s)' {...a11yProps(3)} />
            </Tabs>
          </div>
          <div className='rightPanel'>
            <TabPanel value={value} index={0} className='tabpanel'>
              <AdminAdd />
            </TabPanel>
            <TabPanel value={value} index={1} className='tabpanel'>
              <AdminDelete />
            </TabPanel>
            <TabPanel value={value} index={2} className='tabpanel'>
              <AdminAddOutbreak />
            </TabPanel>
            <TabPanel value={value} index={3} className='tabpanel'>
              <AdminDeleteOutbreak />
            </TabPanel>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.website.accessToken,
    user: state.website.user,
  };
};

export default withWidth()(withRouter(connect(mapStateToProps)(AdminPage)));
