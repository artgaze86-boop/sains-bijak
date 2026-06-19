export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

export const ENRICHMENT_Y5: Record<string, NoteEnrichment> = {
  '5-1': {
    extraExplanation:
      'Pada Tahun 5, murid dikehendaki bukan sahaja mengumpul data tetapi mentafsirnya secara kritis. Graf bar sesuai untuk membandingkan kuantiti, manakala graf garis menunjukkan perubahan mengikut masa. Jadual data perlu mempunyai tajuk, unit dan lajur yang jelas. Semasa menulis laporan, murid perlu menyatakan objektif, hipotesis, bahan, prosedur, keputusan, analisis dan kesimpulan. Ralat sistematik seperti alat ukur tidak tepat atau ralat rawak seperti bacaan tidak konsisten perlu dikenal pasti. Pembentangan poster saintifik memerlukan bahasa ringkas, gambar rajah berlabel dan kesimpulan yang boleh difahami rakan sebaya.',
    extraKeyPoints: [
      'Graf bar: membandingkan data kategori seperti jenis tumbuhan.',
      'Graf garis: menunjukkan perubahan suhu atau pertumbuhan mengikut masa.',
      'Min, mod dan median membantu meringkaskan data numerik.',
      'Ralat sistematik: berlaku secara konsisten, contohnya pembaris bermula dari 1 cm.',
      'Laporan saintifik perlu disusun mengikut bahagian yang standard.',
      'Poster perlu menarik perhatian tetapi kekal berasaskan bukti saintifik.',
    ],
    extraVocabulary: [
      { term: 'graf bar', definition: 'Graf yang menggunakan palang untuk membandingkan kuantiti' },
      { term: 'min', definition: 'Nilai purata hasil tambah semua data dibahagi bilangan data' },
      { term: 'ralat sistematik', definition: 'Kesilapan yang berlaku secara konsisten dalam penyiasatan' },
      { term: 'analisis', definition: 'Proses mentafsir dan membuat kesimpulan daripada data' },
    ],
    extraRecap:
      'Gunakan graf dan jadual untuk menganalisis data. Tulis laporan lengkap, kenal pasti ralat dan sampaikan hasil melalui poster yang jelas dan berasaskan bukti.',
  },

  '5-2': {
    extraExplanation:
      'Rangka manusia dibahagikan kepada rangka paksi (tulang belakang, tengkorak, dada) dan rangka tambahan (lengan, kaki, pelvis). Tulang belakang terdiri daripada vertebra yang melindungi saraf tunjang. Terdapat tiga jenis sendi: sendi tetap seperti tengkorak, sendi sedikit gerak seperti tulang dada, dan sendi bebas gerak seperti lutut dan siku. Otot rangka bekerjasama dengan tulang melalui otot yang menarik tulang apabila mengecut. Tulang bukan sahaja keras tetapi juga hidup — ia menghasilkan sel darah merah dalam sumsum tulang. Kekurangan kalsium dan kurang senaman boleh menyebabkan tulang rapuh atau osteoporosis pada usia dewasa.',
    extraKeyPoints: [
      'Tulang belakang melindungi saraf tunjang dan membantu berdiri tegak.',
      'Sendi lutut dilindungi oleh rawan dan cecair sendi untuk mengurangkan geseran.',
      'Otot rangka hanya menarik tulang, tidak menolak — kerja berpasangan diperlukan.',
      'Sumsum tulang menghasilkan sel darah merah dan putih.',
      'Latihan berat dan makanan berkalsium membantu pembentukan tulang kuat pada zaman remaja.',
      'Tulang patah boleh sembuh melalui proses pembentukan tulang baharu.',
    ],
    extraVocabulary: [
      { term: 'vertebra', definition: 'Himpunan tulang kecil yang membentuk tulang belakang' },
      { term: 'saraf tunjang', definition: 'Rangkaian saraf utama yang berjalan dalam tulang belakang' },
      { term: 'sumsum tulang', definition: 'Tisu lembut di dalam tulang yang menghasilkan sel darah' },
      { term: 'osteoporosis', definition: 'Keadaan tulang menjadi rapuh dan mudah patah' },
    ],
    extraRecap:
      'Rangka terdiri tulang paksi dan tambahan dengan pelbagai jenis sendi. Otot rangka dan tulang bekerjasama untuk pergerakan. Jaga tulang dengan kalsium, vitamin D dan senaman.',
  },

  '5-3': {
    extraExplanation:
      'Peredaran darah dibahagikan kepada peredaran pulmonari dan peredaran sistemik. Peredaran pulmonari membawa darah dari jantung ke paru-paru untuk menerima oksigen dan membuang karbon dioksida. Peredaran sistemik membawa darah beroksigen ke seluruh badan. Jantung mempunyai empat ruang: atrium kanan, ventrikel kanan, atrium kiri dan ventrikel kiri. Injap jantung memastikan darah mengalir satu arah sahaja. Darah mengandungi plasma, sel darah merah, sel darah putih dan platelet. Denyutan nadi di pergelangan tangan atau leher menunjukkan kadar degupan jantung. Amalan hidup sihat seperti senaman aerobik, diet rendah lemak dan tidak merokok menjaga kesihatan jantung.',
    extraKeyPoints: [
      'Peredaran pulmonari: jantung → paru-paru → jantung.',
      'Peredaran sistemik: jantung → badan → jantung.',
      'Sel darah merah mengangkut oksigen menggunakan hemoglobin.',
      'Platelet membantu pembekuan darah apabila luka berlaku.',
      'Tekanan darah tinggi boleh merosakkan salur darah dan jantung.',
      'Senaman meningkatkan kecekapan jantung memompa darah.',
    ],
    extraVocabulary: [
      { term: 'hemoglobin', definition: 'Pigmen merah dalam sel darah merah yang mengangkut oksigen' },
      { term: 'plasma', definition: 'Cecair kuning dalam darah yang mengangkut nutrien dan bahan buangan' },
      { term: 'peredaran pulmonari', definition: 'Peredaran darah antara jantung dan paru-paru' },
      { term: 'injal', definition: 'Struktur dalam jantung yang menghalang darah mengalir ke belakang' },
    ],
    extraRecap:
      'Jantung memompa darah melalui peredaran pulmonari dan sistemik. Darah mengangkut oksigen, nutrien dan membantu pembekuan. Jaga jantung dengan senaman dan pemakanan sihat.',
  },

  '5-4': {
    extraExplanation:
      'Kemandirian spesies merujuk kepada keupayaan spesies mengekalkan populasi tanpa bergantung kepada spesies lain untuk terus hidup. Haiwan membiak secara seksual melalui persenyawaan gamet jantan dan betina, atau secara aseksual seperti pertunasan, pembelahan dua dan regenerasi. Strategi r sesuai untuk persekitaran tidak menentu — menghasilkan banyak anak dengan peluang survival rendah setiap satu. Strategi K sesuai untuk persekitaran stabil — menghasilkan sedikit anak dengan penjagaan intensif. Faktor seperti perubahan iklim, kehilangan habitat, pemangsa berlebihan dan penyakit boleh mengancam kemandirian spesies. Program pembiakan terkawal dan taman semula jadi membantu spesies terancam seperti harimau Malaya dan penyu.',
    extraKeyPoints: [
      'Pembiakan seksual menghasilkan keturunan dengan sifat berbeza — meningkatkan kepelbagaian genetik.',
      'Pembiakan aseksual lebih cepat tetapi keturunan hampir sama sifatnya.',
      'Migrasi dan hibernasi membantu haiwan menyesuaikan diri dengan perubahan musim.',
      'Populasi spesies dikawal oleh makanan, pemangsa, penyakit dan ruang hidup.',
      'Spesies invasif boleh mengancam kemandirian spesies tempatan.',
      'Undang-undang perlindungan hidupan liar menyokong kemandirian spesies.',
    ],
    extraVocabulary: [
      { term: 'gamet', definition: 'Sel pembiakan jantan atau betina seperti sperma dan ovum' },
      { term: 'regenerasi', definition: 'Keupayaan organisma membesarkan semula bahagian badan yang hilang' },
      { term: 'spesies invasif', definition: 'Spesies asing yang mengancam spesies tempatan' },
      { term: 'populasi', definition: 'Bilangan organisma sejenis dalam kawasan tertentu' },
    ],
    extraRecap:
      'Haiwan membiak secara seks atau aseks untuk meneruskan spesies. Strategi r dan K berbeza mengikut persekitaran. Lindungi habitat dan patuhi undang-undang hidupan liar.',
  },

  '5-5': {
    extraExplanation:
      'Sistem pengangkutan tumbuhan terdiri daripada xilem dan floem yang terdapat dalam vaskular tumbuhan. Xilem mengangkut air dan mineral dari akar ke daun melalui pergerakan kapilari, pergerakan akar dan transpirasi. Floem mengangkut hasil fotosintesis seperti glukosa ke seluruh bahagian tumbuhan. Tumbuhan berbunga membiak melalui penyerbukan yang boleh berlaku oleh angin, air, serangga atau burung. Selepas penyerbukan, persenyawaan berlaku dan biji terbentuk dalam buah. Penyebaran biji penting supaya tumbuhan tidak berebut nutrien di kawasan yang sama. Biji boleh disebar melalui angin (contoh: lingkaran), air (contoh: kelapa), haiwan (contoh: mangga) dan letupan buah (contoh: ru).',
    extraKeyPoints: [
      'Transpirasi: wap air keluar dari daun menarik air dari akar melalui xilem.',
      'Akar menyerap air dan mineral dari tanah secara osmosis dan difusi.',
      'Bunga mempunyai bahagian utama: kelopak, sepal, stamen dan pistil.',
      'Penyerbukan silang meningkatkan kepelbagaian genetik tumbuhan.',
      'Buah melindungi biji dan menarik haiwan untuk penyebaran.',
      'Kemandirian tumbuhan bergantung pada cahaya, air, udara dan tanah subur.',
    ],
    extraVocabulary: [
      { term: 'transpirasi', definition: 'Pengeluaran wap air dari daun tumbuhan' },
      { term: 'stamen', definition: 'Bahagian bunga jantan yang menghasilkan serbuk sari' },
      { term: 'pistil', definition: 'Bahagian bunga betina yang menerima serbuk sari' },
      { term: 'vaskular', definition: 'Sistem saluran pengangkutan dalam tumbuhan' },
    ],
    extraRecap:
      'Xilem angkut air ke atas, floem angkut makanan ke seluruh tumbuhan. Penyerbukan dan penyebaran biji memastikan spesies tumbuhan terus hidup.',
  },

  '5-6': {
    extraExplanation:
      'Dalam litar bersiri, komponen disambung dalam satu laluan tunggal sehingga arus yang sama mengalir di semua titik. Jika satu komponen rosak, litar terputus sepenuhnya. Dalam litar selari, setiap komponen mempunyai laluan sendiri ke sumber kuasa, jadi voltan sama tetapi arus boleh berbeza. Rumah kita menggunakan litar selari supaya peralatan berfungsi secara bebas. Arus elektrik diukur dengan ammeter yang disambung secara bersiri. Voltan diukur dengan voltmeter yang disambung secara selari merentasi komponen. Petunjuk keselamatan: jangan sentuh wayar terdedah, jangan gunakan elektrik berhampiran air, pastikan tangan kering, dan matikan suis utama sebelum membaiki alat.',
    extraKeyPoints: [
      'Simbol litar: bateri, suis, mentol, motor dan wayar mempunyai simbol standard.',
      'Rintangan dalam wayar dan komponen mengehadkan arus yang mengalir.',
      'Fius atau pemutus litar (MCB) putus litar jika arus terlalu tinggi.',
      'Konduktor seperti logam membenarkan arus mengalir; insulator seperti plastik menghalangnya.',
      'Renjatan elektrik berlaku apabila arus mengalir melalui badan manusia.',
      'Palam tiga pin dengan wayar bumi melindungi daripada kejutan elektrik.',
    ],
    extraVocabulary: [
      { term: 'ameter', definition: 'Alat mengukur arus elektrik dalam ampere' },
      { term: 'voltmeter', definition: 'Alat mengukur beza voltan antara dua titik' },
      { term: 'rintangan', definition: 'Sifat bahan menghalang aliran arus elektrik' },
      { term: 'konduktor', definition: 'Bahan yang membenarkan arus elektrik mengalir' },
    ],
    extraRecap:
      'Litar bersiri satu laluan, litar selari laluan berasingan. Ukur arus dengan ammeter, voltan dengan voltmeter. Patuhi keselamatan elektrik sentiasa.',
  },

  '5-7': {
    extraExplanation:
      'Haba sentiasa mengalir dari objek bersuhu tinggi ke objek bersuhu rendah sehingga keseimbangan suhu dicapai. Konduksi berlaku apabila zarah bergetar dan memindahkan tenaga kepada zarah bersebelahan — logam ialah konduktor haba yang baik. Konveksi berlaku dalam bendalir (cecair dan gas) melalui peredaran semula jadi — air panas naik dan air sejuk turun. Sinaran memindahkan haba tanpa medium, seperti haba dari Matahari sampai ke Bumi. Pengembangan haba digunakan dalam termometer, rel kereta api dan pemasangan paip. Penguncupan berlaku apabila jirim disejukkan. Aplikasi haba dalam kehidupan termasuk memasak, membakar, penyaman udara, penyejukan dan penghasilan tenaga.',
    extraKeyPoints: [
      'Konduktor haba baik: logam seperti tembaga dan aluminium.',
      'Penebat haba: kayu, plastik, dan udara terperangkap mengurangkan pengaliran haba.',
      'Konveksi dalam bilik: udara panas naik ke atas, udara sejuk turun ke bawah.',
      'Suhu diukur dalam darjah Celsius (°C) atau Kelvin (K).',
      'Pengembangan tidak seragam — logam mengembang lebih daripada kayu.',
      'Perubahan suhu mempengaruhi saiz, bentuk dan sifat jirim.',
    ],
    extraVocabulary: [
      { term: 'konduktor haba', definition: 'Bahan yang memindahkan haba dengan cepat' },
      { term: 'penebat haba', definition: 'Bahan yang menghalang pengaliran haba' },
      { term: 'bendalir', definition: 'Jirim yang mengalir dan mengambil bentuk bekasnya' },
      { term: 'keseimbangan terma', definition: 'Keadaan apabila suhu dua objek menjadi sama' },
    ],
    extraRecap:
      'Haba mengalir melalui konduksi, konveksi dan sinaran. Jirim mengembang bila panas dan mengecut bila sejuk. Fahami pengaliran haba dalam kehidupan harian.',
  },

  '5-8': {
    extraExplanation:
      'Setiap jirim terdiri daripada zarah yang sangat kecil dan bergerak sentiasa. Dalam pepejal, zarah bergetar di kedudukan tetap. Dalam cecair, zarah bergerak bebas tetapi masih berdekatan. Dalam gas, zarah bergerak bebas dan jarak antara zarah besar. Perubahan keadaan melibatkan penyerapan atau pelepasan haba laten. Haba laten lebur ialah haba untuk menukar pepejal ke cecair tanpa perubahan suhu. Haba laten pengewapan ialah haba untuk menukar cecair ke gas. Sublim ialah perubahan terus dari pepejal ke gas, seperti ais kering. Kondensasi berlaku apabila gas menjadi cecair, seperti titisan air pada permukaan sejuk.',
    extraKeyPoints: [
      'Suhu lebur: suhu pepejal berubah menjadi cecair.',
      'Suhu didih: suhu cecair berubah menjadi gas.',
      'Tekanan mempengaruhi takat didih — tekanan tinggi meningkatkan takat didih.',
      'Campuran boleh dipisahkan melalui penapisan, penyaringan, penyulingan dan kromatografi.',
      'Jirim tulen mempunyai sifat tetap seperti takat lebur dan takat didih.',
      'Perubahan fizikal tidak menghasilkan jirim baharu; perubahan kimia menghasilkan jirim baharu.',
    ],
    extraVocabulary: [
      { term: 'haba laten', definition: 'Haba diserap atau dibebaskan semasa perubahan keadaan tanpa perubahan suhu' },
      { term: 'sublim', definition: 'Perubahan terus dari pepejal kepada gas' },
      { term: 'takat didih', definition: 'Suhu di mana cecair mula mendidih' },
      { term: 'zarah', definition: 'Zarah terkecil jirim yang mempunyai sifat jirim itu' },
    ],
    extraRecap:
      'Jirim wujud sebagai pepejal, cecair atau gas. Perubahan keadaan memerlukan haba laten. Zarah bergerak berbeza dalam setiap keadaan.',
  },

  '5-9': {
    extraExplanation:
      'Bumi menyediakan pelbagai sumber asas untuk kehidupan manusia. Sumber boleh diperbaharui seperti air, matahari, angin, hutan dan tanah subur — boleh diisi semula jika diurus dengan baik. Sumber tidak diperbaharui seperti petroleum, gas asli, batu arang dan bijih logam terhad dan akan habis. Kitar air melibatkan penyejatan dari laut dan tasik, kondensasi membentuk awan, presipitasi sebagai hujan, dan aliran air ke laut semula. Aktiviti manusia seperti penebangan hutan, pencemaran sungai dan pembakaran bahan api fosil mengancam keseimbangan alam. Amalan lestari termasuk penjimatan air dan tenaga, kitar semula, penanaman pokok dan penggunaan tenaga boleh diperbaharui.',
    extraKeyPoints: [
      'Lebih 70% permukaan Bumi diliputi air, tetapi air tawar terhad.',
      'Hutan hujan menghasilkan oksigen dan menyimpan karbon dioksida.',
      'Pencemaran udara dari kenderaan dan kilang menyebabkan jerebu dan perubahan iklim.',
      'Penyalahgunaan pestisid boleh mencemari tanah dan air bawah tanah.',
      'Tenaga hidroelektrik menggunakan aliran air untuk menjana elektrik.',
      'Setiap individu boleh menyumbang dengan amalan 3R dan penjimatan tenaga.',
    ],
    extraVocabulary: [
      { term: 'bahan api fosil', definition: 'Bahan api dari sisa organisma purba seperti petroleum dan batu arang' },
      { term: 'presipitasi', definition: 'Air yang jatuh dari atmosfera seperti hujan dan salji' },
      { term: 'deforestasi', definition: 'Penebangan hutan secara meluas' },
      { term: 'tenaga hidro', definition: 'Tenaga yang dihasilkan dari aliran air' },
    ],
    extraRecap:
      'Gunakan sumber Bumi secara bijak. Fahami kitar air dan bezakan sumber diperbaharui dengan tidak diperbaharui. Amalkan gaya hidup lestari.',
  },

  '5-10': {
    extraExplanation:
      'Mesin mudah ialah peranti asas yang memudahkan kerja dengan mengubah besar atau arah daya. Enam jenis mesin mudah: tuas, takal, roda dan gandar, landasan condong, baji dan skru. Mesin kompleks seperti basikal, kereta jentera dan kren menggabungkan beberapa mesin mudah. Kecekapan mesin dikira sebagai peratusan: (tenaga output / tenaga input) × 100%. Tiada mesin 100% cekap kerana sebahagian tenaga hilang sebagai haba akibat geseran. Pelinciran, menggunakan roda dan mengurangkan beban boleh meningkatkan kecekapan. Roda gigi digunakan untuk menukar kelajuan dan arah putaran dalam jentera dan basikal.',
    extraKeyPoints: [
      'Tuas kelas 1: tuas di antara daya dan beban, contoh jongkang-jongkit.',
      'Tuas kelas 2: beban di antara tuas dan daya, contoh wheelbarrow.',
      'Takal tunggal tidak mengubah daya tetapi mengubah arah tarikan.',
      'Takal berganda mengurangkan daya diperlukan untuk mengangkat beban.',
      'Landasan condong memanjangkan jarak untuk mengurangkan daya diperlukan.',
      'Geseran berguna dalam brek tetapi merugikan dalam enjin.',
    ],
    extraVocabulary: [
      { term: 'tuas', definition: 'Kayu atau batang keras yang berputar pada fulkrum' },
      { term: 'fulkrum', definition: 'Titik sokongan atau pangsi tuas' },
      { term: 'tuas kelas', definition: 'Kategori tuas berdasarkan kedudukan daya, fulkrum dan beban' },
      { term: 'roda gigi', definition: 'Roda bergerigi yang menghantar daya dan ubah kelajuan' },
    ],
    extraRecap:
      'Mesin kompleks gabungan mesin mudah. Kecekapan = output/input × 100%. Kurangkan geseran dengan pelinciran untuk kerja lebih cekap.',
  },
};