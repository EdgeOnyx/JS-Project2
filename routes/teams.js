const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/TeamController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/teams', index); 
  router.get('/teams/new', auth, _new); 
  router.post('/teams', auth, create);  
  router.post('/teams/update', auth, update);  
  router.post('/teams/delete', auth, _delete);  
  router.get('/teams/:id/edit', auth, edit);  
  router.get('/teams/:id', show);
};