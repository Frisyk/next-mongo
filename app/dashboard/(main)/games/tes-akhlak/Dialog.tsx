const getDate = () => {
    const now = new Date();

    // Format day, date, month, and year
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('id-ID', dateOptions).format(now);

    // Format time (hours, minutes, seconds)
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(now);

    return `${formattedDate} pukul ${formattedTime}`;
};
