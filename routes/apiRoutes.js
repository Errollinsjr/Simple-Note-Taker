// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => res.json(note));

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => res.json(note));

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete('/api/notes/${id}', (req, res) => {res.json({ ok: true });
  });
};
