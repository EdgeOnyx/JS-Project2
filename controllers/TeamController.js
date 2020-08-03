// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'teams';
const Team = require('../models/Team');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const teams = await Team
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Archive',
      teams: teams
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying teams: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('user');
    res.render(`${viewPath}/show`, {
      pageTitle: team.teamName,
      team: team
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this team: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
 res.render(`${viewPath}/new`,{
   pageTitle: 'New Team'
 })
};

exports.create = async (req, res) => {
  try{
    const {user: email} = req.session.passport;
    const user = await User.findOne({email: email});
    const team = await Team.create({user: user._id, ...req.body});

    req.flash('success','Your team has been created');
    res.redirect(`/teams/${team.id}`);
} catch (error){
      req.flash('danger',`There was an issue displaying this team: ${error}`);
      res.redirect('/');
}
};

exports.edit = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: team.teamName,
      formData: team
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this team: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let team = await Team.findById(req.body.id);
    if (!team) throw new Error('Team could not be found');

    const attributes = {user: user._id, ...req.body};
    await Team.validate(attributes);
    await Team.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The team was updated successfully');
    res.redirect(`/teams/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this team: ${error}`);
    res.redirect(`/teams/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Team.deleteOne({_id: req.body.id});
    req.flash('success', 'The team was deleted successfully');
    res.redirect(`/teams`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this team: ${error}`);
    res.redirect(`/teams`);
  }
};