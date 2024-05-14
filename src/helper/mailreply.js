

const mailreply = () => {

    const message = `
        I hope this email finds you well. I wanted to take a moment to express my sincere gratitude for your feedback about my website. Your input is incredibly valuable to me, and I truly appreciate the time and effort you took to provide it.

        Your feedback has helped me identify areas for improvement and make necessary changes to enhance the user experience on my website. I am committed to delivering the best possible experience to my visitors, and your feedback has played a crucial role in achieving that goal.

        Once again, thank you for taking the time to share your thoughts and suggestions. Your support and encouragement mean a lot to me. If you have any further feedback or questions, please don't hesitate to reach out.

        Wishing you all the best.

        Kind regards,
       
    `;

    return message;
};
const contract = (user, purchasedItems, totalAmount, shippingAddress,code) => {
    const message = `
    <html>
    <body>
        <h2>Thank You for Your Purchase!</h2>
        <p>Dear ${user},</p>
        <p>Your order has been successfully placed:</p>
        <ul>
            ${purchasedItems.map(item => `<li>${item.name} - ${item.quantity} x ${item.price}</li>`).join('')}
        </ul>
        <p>Total Amount: $${totalAmount}</p>
        <p>Order code: ${code}</p>
        <p>Shipping Address:</p>
        <p>${shippingAddress}</p>
        <p>If you have any questions or concerns about your order, please contact us at mrtaivietbac@gmail.com.</p>
        <p>Thank you for shopping with us!</p>
    </body>
    </html>
    `;
    return message;
};


module.exports = {
    mailreply,
    contract,
}