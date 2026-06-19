export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

export const ENRICHMENT_Y3: Record<string, NoteEnrichment> = {
  '3-1': {
    extraExplanation:
      'Kemahiran proses sains bukan sekadar hafalan langkah, tetapi cara berfikir seperti seorang penyiasat. Murid Tahun 3 perlu belajar merancang eksperimen mudah di sekolah atau rumah, contohnya mengukur masa tumbuhan menegak selepas diberi air. Di Malaysia, guru sains sering menggunakan bahan tempatan seperti daun pandan, biji kacang tanah dan air hujan untuk aktiviti penyiasatan yang dekat dengan kehidupan harian.',
    extraKeyPoints: [
      'Aktiviti mudah: ukur ketinggian tumbuhan setiap hari selama seminggu dan catat dalam jadual.',
      'Buat inferens apabila melihat corak, contohnya pokok di kawasan teduh tumbuh lebih perlahan.',
      'Kawal pembolehubah dengan hanya menukar jumlah air, manakala cahaya dan jenis pasu dikekalkan.',
    ],
    extraVocabulary: [
      { term: 'hipotesis', definition: 'Jangkaan awal yang boleh diuji melalui eksperimen' },
      { term: 'graf', definition: 'Gambar rajah yang menunjukkan hubungan antara data yang diukur' },
    ],
    extraRecap:
      'Kemahiran proses sains membantu murid mengukur dengan betul, mengecam corak, membuat inferens dan mengawal pembolehubah supaya penyiasatan menjadi lebih teratur dan boleh dipercayai.',
  },

  '3-2': {
    extraExplanation:
      'Kesihatan manusia merangkumi lebih daripada tidak sakit; ia bermaksud badan berfungsi dengan baik setiap hari. Sistem pencernaan memecahkan nasi lemak, roti canai dan buah-buahan tempatan menjadi tenaga untuk belajar dan bermain. Amalan seperti makan sarapan sebelum ke sekolah, memilih makanan kurang gula di kantin dan bersenam di taman permainan membantu mencegah masalah kesihatan yang semakin biasa di kalangan kanak-kanak Malaysia.',
    extraKeyPoints: [
      'Pilih pinggan sihat MyHealthyPlate: separuh sayur dan buah, suku kanji, suku protein.',
      'Minum air kosong secara kerap terutama selepas bersukan di cuaca panas Malaysia.',
      'Rehat mencukupi pada waktu malam membantu badan membaiki tisu dan mengekalkan imuniti.',
    ],
    extraVocabulary: [
      { term: 'enzim', definition: 'Bahan dalam mulut dan perut yang membantu memecahkan makanan' },
      { term: 'imuniti', definition: 'Keupayaan badan melawan jangkitan penyakit' },
    ],
    extraRecap:
      'Kesihatan manusia bergantung pada pemakanan seimbang, senaman, rehat mencukupi dan penjagaan sistem pencernaan supaya badan sentiasa bertenaga dan kurang mudah sakit.',
  },

  '3-3': {
    extraExplanation:
      'Gigi manusia direka untuk tugas berbeza sepanjang hayat. Gigi susu membantu kanak-kanak mengunyah makanan lembut, manakala gigi kekal muncul secara berperingkat sehingga remaja. Di Malaysia, program kesihatan pergigian di sekolah dan klinik komuniti menggalakkan murid berus gigi selepas sarapan dan sebelum tidur untuk mengurangkan karies akibat minuman manis seperti sirap bandung dan teh tarik.',
    extraKeyPoints: [
      'Gunakan teknik berus gigi: gerakkan berus secara bulat pada permukaan hadapan dan belakang gigi.',
      'Kurangkan snek bergula seperti ais krim dan gula-gula antara waktu makan utama.',
      'Lawat klinik pergigian sekolah atau klinik kesihatan untuk pemeriksaan dan nasihat pencegahan.',
    ],
    extraVocabulary: [
      { term: 'plak', definition: 'Lapisan kuman melekat pada gigi yang boleh menyebabkan karies' },
      { term: 'gigi kekal', definition: 'Gigi kedua yang tumbuh menggantikan gigi susu dan kekal seumur hidup' },
    ],
    extraRecap:
      'Menjaga gigi bermaksud memahami jenis dan fungsi gigi, membersihkannya dengan betul setiap hari serta mengurangkan makanan manis untuk mencegah karies.',
  },

  '3-4': {
    extraExplanation:
      'Haiwan memainkan peranan penting dalam ekosistem Malaysia seperti hutan tropika, paya bakau dan laut. Pengeluar seperti pokok hutan hujan membekalkan makanan kepada herbivor seperti tapir dan kijang, manakala pengguna sekunder seperti harimau memangsa haiwan lain. Gangguan rantaian makanan, contohnya pencemaran sungai atau pembalakan haram, boleh mengancam keseimbangan alam dan kelangsungan hidup spesies tempatan.',
    extraKeyPoints: [
      'Contoh rantaian makanan Malaysia: alga → ikan keli → heron → kuman pengurai.',
      'Herbivor seperti lembu dan kambing memakan rumput; karnivor seperti helang memburu mangsa kecil.',
      'Lindungi habitat seperti Taman Negara dan hutan bakau untuk mengekalkan keseimbangan ekosistem.',
    ],
    extraVocabulary: [
      { term: 'herbivor', definition: 'Haiwan yang memakan tumbuhan sebagai makanan utama' },
      { term: 'karnivor', definition: 'Haiwan yang memakan daging haiwan lain' },
    ],
    extraRecap:
      'Haiwan dikelaskan mengikut cara memperoleh makanan dalam rantaian makanan, dan setiap peranan penting untuk mengekalkan keseimbangan ekosistem di Malaysia.',
  },

  '3-5': {
    extraExplanation:
      'Tumbuhan ialah pengeluar utama yang menyokong semua kehidupan di Bumi. Melalui fotosintesis, pokok getah, pokok kelapa dan pokok durian di Malaysia menukar cahaya matahari, air dan karbon dioksida menjadi makanan serta mengeluarkan oksigen. Aktiviti menanam cili, kangkung atau pokok hiasan di halaman rumah atau projek kebun sekolah membantu murid memahami keperluan tumbuhan seperti cahaya, air dan nutrien.',
    extraKeyPoints: [
      'Eksperimen mudah: letakkan tumbuhan di tempat gelap dan cerah, bandingkan pertumbuhannya selepas seminggu.',
      'Daun hijau mengandungi klorofil yang menyerap cahaya untuk fotosintesis.',
      'Tumbuhan menghasilkan oksigen yang diperlukan manusia, haiwan dan kehidupan akuatik.',
    ],
    extraVocabulary: [
      { term: 'klorofil', definition: 'Zat hijau dalam daun yang menyerap cahaya untuk fotosintesis' },
      { term: 'pengeluar', definition: 'Organisma yang membuat makanan sendiri melalui fotosintesis' },
    ],
    extraRecap:
      'Tumbuhan membuat makanan melalui fotosintesis, menghasilkan oksigen dan menjadi asas tenaga dalam setiap ekosistem termasuk hutan dan ladang di Malaysia.',
  },

  '3-6': {
    extraExplanation:
      'Pengukuran yang tepat penting dalam sains kerana ia membolehkan kita membandingkan dan membuat kesimpulan. Unit SI seperti meter, kilogram dan liter digunakan di seluruh dunia termasuk dalam makmal sekolah di Malaysia. Murid boleh mempraktikkan pengukuran semasa memasak di rumah, contohnya mengukur 250 mL air untuk rebus beras atau menimbang 500 g tepung untuk membuat kuih tradisional.',
    extraKeyPoints: [
      'Gunakan pembaris untuk ukur panjang objek seperti pensel dan buku nota dalam sentimeter.',
      'Gelas ukur sesuai untuk mengukur isi padu cecair seperti air dan susu dengan tepat.',
      'Catat bacaan termometer apabila memerhatikan suhu bilik, air sejuk dan air suam.',
    ],
    extraVocabulary: [
      { term: 'unit SI', definition: 'Sistem unit antarabangsa yang standard untuk pengukuran sains' },
      { term: 'neraca', definition: 'Alat untuk mengukur jisim objek dengan tepat' },
    ],
    extraRecap:
      'Pengukuran menggunakan unit SI dan alat yang sesuai membantu murid mendapat data tepat untuk membandingkan, merekod dan membuat kesimpulan dalam penyiasatan sains.',
  },

  '3-7': {
    extraExplanation:
      'Ketumpatan menerangkan sebab sesetengah objek terapung manakala yang lain tenggelam dalam cecair yang sama. Objek terapung apabila ketumpatannya lebih rendah daripada cecair, seperti kayu balak terapung di Sungai Pahang. Kapal kontena di Pelabuhan Klang walaupun diperbuat daripada besi berat masih boleh terapung kerana bentuk badan kapal mempunyai isi padu besar yang mengandungi banyak udara.',
    extraKeyPoints: [
      'Eksperimen: bandingkan ketumpatan batu, kayu dan bola plastik dalam bekas berisi air.',
      'Ketumpatan air kira-kira 1 g/cm³; objek kurang padat daripadanya akan terapung.',
      'Bentuk objek mempengaruhi terapung atau tenggelam walaupun jisimnya sama.',
    ],
    extraVocabulary: [
      { term: 'jisim', definition: 'Kuantiti bahan dalam sesuatu objek, biasanya diukur dalam gram atau kilogram' },
      { term: 'apungan', definition: 'Daya ke atas yang ditolak oleh cecair ke atas objek yang direndam' },
    ],
    extraRecap:
      'Ketumpatan ialah jisim per unit isi padu; objek terapung atau tenggelam bergantung pada perbandingan ketumpatan objek dengan cecair serta bentuknya.',
  },

  '3-8': {
    extraExplanation:
      'Asid dan alkali wujud dalam kehidupan seharian di Malaysia, daripada air limau nipis yang masam hingga sabun cuci pinggan yang bersifat alkali. Indikator litmus membantu murid menguji bahan dengan selamat di makmal sekolah. Memahami sifat asid dan alkali juga penting untuk keselamatan, contohnya tidak mencampur pelbagai bahan pembersih di rumah kerana ia boleh menghasilkan gas berbahaya.',
    extraKeyPoints: [
      'Bahan asid tempatan: jus limau, cuka, air teh yang masam; alkali: air sabun, air kapur sirih.',
      'Uji dengan kertas litmus: asid menukar litmus biru ke merah, alkali menukar litmus merah ke biru.',
      'Air tulen bersifat neutral dengan pH 7, manakala asid pH rendah dan alkali pH tinggi.',
    ],
    extraVocabulary: [
      { term: 'indikator', definition: 'Bahan yang berubah warna untuk menunjukkan sifat asid atau alkali' },
      { term: 'neutral', definition: 'Keadaan bahan yang tidak bersifat asid mahupun alkali, pH = 7' },
    ],
    extraRecap:
      'Asid berasa masam dan alkali berasa pahit serta licin; ujian litmus dan skala pH membantu mengenal pasti sifat bahan dengan lebih sistematik.',
  },

  '3-9': {
    extraExplanation:
      'Sistem Suria ialah keluarga besar yang terdiri daripada Matahari dan lapan planet. Bumi ialah planet ketiga yang mempunyai air cecair dan atmosfera sesuai untuk kehidupan, termasuk di Malaysia yang terletak berhampiran khatulistiwa. Pergerakan Bumi mengelilingi paksi menghasilkan siang dan malam, manakala peredaran mengelilingi Matahari dalam tempoh kira-kira 365 hari menghasilkan perubahan musim di sesetengah negara.',
    extraKeyPoints: [
      'Malaysia mengalami cuaca panas dan hujan sepanjang tahun kerana lokasi berhampiran khatulistiwa.',
      'Bulan mengorbit Bumi dan mempengaruhi fenomena seperti pasang surut di pantai Malaysia.',
      'Planet gergasi seperti Musytari jauh lebih besar daripada Bumi dan kebanyakannya terdiri daripada gas.',
    ],
    extraVocabulary: [
      { term: 'khatulistiwa', definition: 'Garis khayalan di tengah Bumi yang menerima cahaya matahari hampir sama sepanjang tahun' },
      { term: 'gergasi gas', definition: 'Planet besar seperti Musytari yang terdiri terutamanya daripada gas' },
    ],
    extraRecap:
      'Sistem Suria terdiri daripada Matahari dan lapan planet; Bumi berputar menghasilkan siang malam dan mengelilingi Matahari menghasilkan satu tahun dengan fenomena berkaitan seperti musim dan pasang surut.',
  },

  '3-10': {
    extraExplanation:
      'Mesin ringkas membantu manusia melakukan kerja dengan lebih mudah tanpa mencipta tenaga baru. Di kehidupan harian Malaysia, tuas boleh dilihat pada jongkang-jongkit di taman, takal digunakan untuk mengangkat baldi air di kampung, dan landasan condong membantu menolak gerabak di pasar malam. Memahami mesin ringkas membantu murid mengecam bagaimana sains digunakan dalam alat dan struktur di sekeliling mereka.',
    extraKeyPoints: [
      'Jongkang-jongkit: duduk lebih dekat ke fulkrum memerlukan daya lebih besar untuk mengangkat rakan.',
      'Takal tetap: satu roda berulir; takal bergerak: beberapa roda mengurangkan daya angkat dengan ketara.',
      'Landasan condong panjang dan rendah memudahkan menolak beban berat ke tingkat yang lebih tinggi.',
    ],
    extraVocabulary: [
      { term: 'daya', definition: 'Tarikan atau tolakan yang digunakan untuk menggerakkan atau mengangkat objek' },
      { term: 'baji', definition: 'Mesin ringkas berbentuk segi tiga yang memecahkan atau mengangkat objek' },
    ],
    extraRecap:
      'Mesin ringkas seperti tuas, takal, landasan condong dan baji memudahkan kerja dengan mengubah saiz atau arah daya tanpa menambah jumlah tenaga.',
  },
};