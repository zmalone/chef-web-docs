GULP_CONFIG = JSON.parse(File.read('gulpfile.js/config.json'))
REV_MANIFEST_PATH = File.join(GULP_CONFIG['root']['dest'], 'rev-manifest.json')
REV_MANIFEST = {}
