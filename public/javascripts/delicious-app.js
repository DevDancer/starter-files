import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';

autocomplete( $('#address'), $('#lat'), $('#lng') );    // bling framework subs 'document.querySelector' for '$'

typeAhead( $('.search') );