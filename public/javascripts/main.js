

// stop 'confirm form resubmission'
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }


history.replaceState({}, document.title, window.location.href.split('#')[0]);