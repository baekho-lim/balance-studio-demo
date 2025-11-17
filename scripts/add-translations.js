const fs = require('fs')
const path = require('path')

// Translations for all 21 artworks - maintaining gallery/collector professional tone
const translations = {
  'sg-001': {
    vi: 'Nếu bạn chỉ đang đi ngang qua khu rừng này, bạn sẽ dừng lại để ngắm nhìn điều gì thay vì chỉ bước qua?',
    ms: 'Jika anda hanya melalui hutan ini, apakah yang akan anda berhenti sejenak untuk diperhatikan?',
    id: 'Jika Anda hanya melewati hutan ini, apa yang akan Anda hentikan untuk diamati alih-alih hanya berjalan melewatinya?'
  },
  'sg-002': {
    vi: 'Bạn đang nhìn vào những gì hiện có, hay đang chờ đợi điều gì chưa nở rộ?',
    ms: 'Adakah anda melihat apa yang ada sekarang, atau menunggu sesuatu yang belum mekar?',
    id: 'Apakah Anda melihat apa yang ada sekarang, atau menunggu sesuatu yang belum mekar?'
  },
  'sg-003': {
    vi: 'Bạn có nhớ một điều nhỏ bé nào đã bất ngờ thay đổi cả ngày của bạn không?',
    ms: 'Bolehkah anda mengingati sesuatu yang kecil yang secara tidak dijangka mengubah seluruh hari anda?',
    id: 'Bisakah Anda mengingat hal kecil yang secara tidak terduga mengubah seluruh hari Anda?'
  },
  'sg-004': {
    vi: 'Lúc này bạn đang gần hơn với sự thay đổi từ từ hay sự chuyển hóa đột ngột?',
    ms: 'Adakah anda lebih dekat sekarang dengan perubahan yang perlahan atau transformasi yang tiba-tiba?',
    id: 'Apakah Anda sekarang lebih dekat dengan perubahan yang perlahan atau transformasi yang tiba-tiba?'
  },
  'sg-005': {
    vi: 'Trong khung cảnh yên bình này, bạn cảm nhận được sự cảnh giác hoặc căng thẳng ẩn giấu ở đâu?',
    ms: 'Dalam pemandangan yang tenang ini, di manakah anda merasakan kewaspadaan atau ketegangan tersembunyi?',
    id: 'Dalam pemandangan yang tenang ini, di mana Anda merasakan kewaspadaan atau ketegangan yang tersembunyi?'
  },
  'sg-006': {
    vi: 'Điều gì trong cuộc sống của bạn đang tiến về phía trước rất chậm, nhưng vẫn đang di chuyển?',
    ms: 'Apakah satu perkara dalam hidup anda yang bergerak sangat perlahan, tetapi masih bergerak?',
    id: 'Apa satu hal dalam hidup Anda yang bergerak sangat perlahan, tetapi tetap bergerak?'
  },
  'sg-007': {
    vi: 'Công việc nào bạn vẫn làm một cách trung thành, ngay cả khi dường như không ai để ý?',
    ms: 'Apakah kerja yang anda terus lakukan dengan setia, walaupun tiada siapa yang nampaknya perasan?',
    id: 'Pekerjaan apa yang terus Anda lakukan dengan setia, bahkan ketika tidak ada yang tampaknya memperhatikan?'
  },
  'sg-008': {
    vi: 'Nếu phải chọn một cảm xúc mà bạn bị thu hút nhất lúc này, đó sẽ là gì và tại sao?',
    ms: 'Jika anda perlu memilih satu perasaan yang paling menarik anda sekarang, apakah itu dan mengapa?',
    id: 'Jika Anda harus memilih satu perasaan yang paling menarik bagi Anda sekarang, apa itu dan mengapa?'
  },
  'es-001': {
    vi: 'Khi nào tiếng nói của bạn tuôn ra tự nhiên nhất, như tiếng chim hót?',
    ms: 'Bilakah suara anda mengalir keluar paling mudah, seperti nyanyian burung?',
    id: 'Kapan suara Anda mengalir paling mudah, seperti kicauan burung?'
  },
  'es-002': {
    vi: 'Bạn có nhớ khoảnh khắc nào mà bạn không cần nhiều lời để được hiểu?',
    ms: 'Bolehkah anda mengingati satu saat apabila anda tidak memerlukan banyak perkataan untuk difahami?',
    id: 'Bisakah Anda mengingat momen ketika Anda tidak memerlukan banyak kata untuk dipahami?'
  },
  'es-003': {
    vi: 'Nếu bạn dừng lại bên dòng nước này một lúc, bạn muốn đặt xuống và nghỉ ngơi khỏi điều gì?',
    ms: 'Jika anda berhenti di tepi air ini sebentar, apakah yang anda ingin letakkan dan berehat daripadanya?',
    id: 'Jika Anda berhenti di tepi air ini sebentar, apa yang ingin Anda letakkan dan istirahatkan?'
  },
  'es-004': {
    vi: 'Nếu bạn có thể làm sáng lên ngày hôm nay của một người, ai sẽ xuất hiện trong tâm trí bạn?',
    ms: 'Jika anda boleh mencerahkan hari seseorang hari ini, siapakah yang terlintas di fikiran?',
    id: 'Jika Anda bisa mencerahkan hari seseorang hari ini, siapa yang terlintas di pikiran Anda?'
  },
  'es-005': {
    vi: 'Nhìn vào ánh lấp lánh này, khoảnh khắc hạnh phúc nào trong cuộc đời bạn cảm thấy giống nó nhất?',
    ms: 'Melihat kilauan ini, detik bahagia manakah dalam hidup anda yang paling serupa dengannya?',
    id: 'Melihat kilauan ini, momen bahagia mana dalam hidup Anda yang paling mirip dengannya?'
  },
  'ds-001': {
    vi: 'Một câu bạn muốn nói với bản thân tương lai trưởng thành của mình là gì?',
    ms: 'Apakah satu ayat yang anda ingin sampaikan kepada diri anda yang akan dewasa kelak?',
    id: 'Apa satu kalimat yang ingin Anda sampaikan kepada diri Anda yang dewasa di masa depan?'
  },
  'ds-002': {
    vi: 'Khi bạn tưởng tượng mình già đi, điều gì làm bạn sợ nhất và điều gì bạn tò mò hoặc hy vọng nhất?',
    ms: 'Apabila anda membayangkan diri menjadi tua, apakah yang paling menakutkan dan apakah yang paling anda ingin tahu atau harapkan?',
    id: 'Ketika Anda membayangkan diri menjadi tua, apa yang paling menakutkan dan apa yang paling ingin Anda ketahui atau harapkan?'
  },
  'ds-003': {
    vi: 'Biết rằng mọi thứ sẽ kết thúc một ngày nào đó, điều đó thay đổi cách bạn nhìn khoảnh khắc này như thế nào?',
    ms: 'Mengetahui bahawa segala-galanya akan berakhir suatu hari nanti, bagaimanakah itu mengubah cara anda melihat saat ini?',
    id: 'Mengetahui bahwa segalanya akan berakhir suatu hari nanti, bagaimana hal itu mengubah cara Anda melihat momen ini?'
  },
  'ds-004': {
    vi: 'Sau khi thế giới dường như rung chuyển, điều gì trong cuộc sống của bạn âm thầm tiếp tục như thể không có gì xảy ra?',
    ms: 'Selepas dunia seolah-olah bergegar, apakah dalam hidup anda yang diam-diam berterusan seolah-olah tiada apa yang berlaku?',
    id: 'Setelah dunia tampak berguncang, apa dalam hidup Anda yang diam-diam terus berlanjut seolah-olah tidak ada yang terjadi?'
  },
  'wt-001': {
    vi: 'Nếu những cảm xúc trong tim bạn là mặt nước này, hôm nay chúng sẽ có màu gì?',
    ms: 'Jika perasaan di hati anda adalah permukaan air ini, apakah warnanya hari ini?',
    id: 'Jika perasaan di hati Anda adalah permukaan air ini, warna apa yang akan mereka miliki hari ini?'
  },
  'wt-002': {
    vi: 'Hướng tới một nơi vẫn còn xa xôi, một bước nhỏ nào bạn có thể thực hiện hôm nay?',
    ms: 'Ke arah tempat yang masih terasa jauh, apakah satu langkah kecil yang boleh anda ambil hari ini?',
    id: 'Menuju tempat yang masih terasa jauh, apa satu langkah kecil yang bisa Anda ambil hari ini?'
  },
  'wt-003': {
    vi: 'Nếu "một ngày nào đó" trở thành "bây giờ", nơi nào trong tâm hồn bạn muốn ghé thăm đầu tiên?',
    ms: 'Jika "suatu hari nanti" menjadi "sekarang", tempat dalaman manakah yang anda ingin lawati dahulu?',
    id: 'Jika "suatu hari nanti" menjadi "sekarang", tempat batin mana yang ingin Anda kunjungi terlebih dahulu?'
  },
  'wt-004': {
    vi: 'Nếu bạn quên đi thành công và thất bại trong chốc lát và chỉ tập trung vào việc bạn đang trưởng thành, điều gì sẽ cảm thấy nhẹ nhàng hơn một chút?',
    ms: 'Jika anda melupakan kejayaan dan kegagalan seketika dan fokus hanya pada hakikat bahawa anda sedang berkembang, apakah yang akan terasa sedikit lebih ringan?',
    id: 'Jika Anda melupakan kesuksesan dan kegagalan sejenak dan hanya fokus pada kenyataan bahwa Anda sedang tumbuh, apa yang akan terasa sedikit lebih ringan?'
  }
}

// Read artworks.json
const artworksPath = path.join(__dirname, '../src/data/artworks.json')
const artworks = JSON.parse(fs.readFileSync(artworksPath, 'utf8'))

// Add translations to each artwork
artworks.forEach(artwork => {
  if (translations[artwork.id]) {
    artwork.questionVi = translations[artwork.id].vi
    artwork.questionMs = translations[artwork.id].ms
    artwork.questionId = translations[artwork.id].id
  }
})

// Write updated artworks.json
fs.writeFileSync(artworksPath, JSON.stringify(artworks, null, 2))

console.log('✅ Added translations for all 21 artworks')
console.log('   - Vietnamese (vi)')
console.log('   - Malay (ms)')
console.log('   - Indonesian (id)')
