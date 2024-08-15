import AuthHOC from '@/utils/AuthHOC';
import { lazy } from 'react';
import ViewOnGoingTrips from '../pages/TripModule/Trips/OnGoingTrips/ViewOnGoingTrips';
import ViewNoResponse from '../pages/TripModule/Trips/NoResponseTrips/ViewNoResponse';
import ViewSheduleTrips from '../pages/TripModule/Trips/SheduledTrips/ViewSheduleTrips';
import ViewPastTrips from '../pages/TripModule/Trips/PastTrips/ViewPastTrips';

const Index = lazy(() => import('../pages/Index'));

const Login = lazy(() => import('../pages/Auth/Login'));

// Admin Roles -->
const CreateRoles = lazy(() => import('../pages/AdminModule/Roles/CreateRoles'));
const EditRoles = lazy(() => import('../pages/AdminModule/Roles/EditRoles'));
const ViewRoles = lazy(() => import('../pages/AdminModule/Roles/ViewRoles'));
const ViewSpecificRoles = lazy(() => import('../pages/AdminModule/Roles/ViewSpecificRoles'));

// Admin  -->
const CreateAdmin = lazy(() => import('../pages/AdminModule/Admin/CreateAdmin'));
const EditAdmin = lazy(() => import('../pages/AdminModule/Admin/EditAdmin'));
const ViewAdmin = lazy(() => import('../pages/AdminModule/Admin/ViewAdmin'));
const PendingAdmin = lazy(() => import('../pages/AdminModule/Admin/PendingAdmin'));
const ViewSpecificAdmin = lazy(() => import('../pages/AdminModule/Admin/ViewSpecificAdmin'));

// Admin Team -->
const CreateAdminTeams = lazy(() => import('../pages/AdminModule/AdminTeams/CreateAdminTeams'));
const EditAdminTeams = lazy(() => import('../pages/AdminModule/AdminTeams/EditAdminTeams'));
const ViewAdminTeams = lazy(() => import('../pages/AdminModule/AdminTeams/ViewAdminTeams'));
const ViewSpecificAdminTeams = lazy(() => import('../pages/AdminModule/AdminTeams/ViewSpecificAdminTeams'));

// My Team -->
const ViewMyTeam = lazy(() => import('../pages/AdminModule/AdminTeams/MyTeam/ViewMyTeam'));

// Admin  Tickets-->
const CreateAdminTickets = lazy(() => import('../pages/AdminModule/AdminTickets/CreateAdminTickets'));
const EditAdminTickets = lazy(() => import('../pages/AdminModule/AdminTickets/EditAdminTickets'));
const ViewAdminTickets = lazy(() => import('../pages/AdminModule/AdminTickets/ViewAdminTickets'));
const PendingAdminTickets = lazy(() => import('../pages/AdminModule/AdminTickets/PendingAdminTickets'));
const ViewSpecificAdminTickets = lazy(() => import('../pages/AdminModule/AdminTickets/ViewSpecificAdminTickets'));

//Admin SubModule Tickets-->
const ViewRaisedAgainstMeTickets = lazy(() => import('../pages/AdminModule/AdminTickets/RaisedAgainstMeTickets/ViewRaisedAgainstMeTickets'));
const ViewRaisedByMeTickets = lazy(() => import('../pages/AdminModule/AdminTickets/RaisedByMeTickets/ViewRaisedByMeTickets'));
const ViewOpenTickets = lazy(() => import('../pages/AdminModule/AdminTickets/OpenTickets/ViewOpenTickets'));
const ViewClosedTickets = lazy(() => import('../pages/AdminModule/AdminTickets/ClosedTickets/ViewClosedTickets'));
const ViewReopenTickets = lazy(() => import('../pages/AdminModule/AdminTickets/ReopenTickets/ViewReopenTickets'));
const ViewInProgressTickets = lazy(() => import('../pages/AdminModule/AdminTickets/InProgressTickets/ViewInProgressTickets'));
const ViewUnresolvedTickets = lazy(() => import('../pages/AdminModule/AdminTickets/UnresolvedTickets/ViewUnresolvedTickets'));
const ViewCompletedTickets = lazy(() => import('../pages/AdminModule/AdminTickets/CompletedTickets/ViewCompletedTickets'));
const ViewTicketsRaisedByAdmin = lazy(() => import('../pages/AdminModule/AdminTickets/TicketsRaisedByAdmin/ViewTicketRaisedByAdmin'));
const ViewChannelPartnerTickets = lazy(() => import('../pages/AdminModule/AdminTickets/ChannelPartnerTickets/ViewChannelPartnerTickets'));
const ViewDriverTickets = lazy(() => import('../pages/AdminModule/AdminTickets/DriverTickets/ViewDriverTickets'));
const ViewTravelAgencyTickets = lazy(() => import('../pages/AdminModule/AdminTickets/TravelAgencyTickets/ViewTravelAgencyTickets'));
const ViewDistributorTickets = lazy(() => import('../pages/AdminModule/AdminTickets/DistributorTickets/ViewDistributorTickets'));

// Admin  Channel Partner -->
const CreateChannelPartner = lazy(() => import('../pages/AdminModule/ChannelPartner/CreateChannelPartner'));
const EditChannelPartner = lazy(() => import('../pages/AdminModule/ChannelPartner/EditChannelPartner'));
const ViewChannelPartner = lazy(() => import('../pages/AdminModule/ChannelPartner/ViewChannelPartner'));
const ViewSpecificChannelPartner = lazy(() => import('../pages/AdminModule/ChannelPartner/ViewSpecificChannelPartner'));

// Admin  Distributor -->
const CreateDistributor = lazy(() => import('../pages/AdminModule/Distributor/CreateDistributor'));
const EditDistributor = lazy(() => import('../pages/AdminModule/Distributor/EditDistributor'));
const ViewDistributor = lazy(() => import('../pages/AdminModule/Distributor/ViewDistributor'));
const ViewSpecificDistributor = lazy(() => import('../pages/AdminModule/Distributor/ViewSpecificDistributor'));

const ViewSubDistributor = lazy(() => import('../pages/AdminModule/Distributor/SubDistributor/ViewSubDistributor'));

const CreateDistributorSettings = lazy(() => import('../pages/AdminModule/Distributor/DistributorSettings/CreateDistributorSettings'));
const EditDistributorSettings = lazy(() => import('../pages/AdminModule/Distributor/DistributorSettings/EditDistributorSettings'));
const ViewDistributorSettings = lazy(() => import('../pages/AdminModule/Distributor/DistributorSettings/ViewDistributorSettings'));
const ViewSpecificDistributorSettings = lazy(() => import('../pages/AdminModule/Distributor/DistributorSettings/ViewSpecificDistributorSettings'));

// Admin  CH Api -->
const CreateChannelPartnerAPI = lazy(() => import('../pages/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI'));
const EditChannelPartnerAPI = lazy(() => import('../pages/AdminModule/ChannelPartnerAPI/EditChannelPartnerAPI'));
const ViewChannelPartnerAPI = lazy(() => import('../pages/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI'));
const ViewSpecificChannelPartnerAPI = lazy(() => import('../pages/AdminModule/ChannelPartnerAPI/ViewSpecificChannelPartnerAPI'));
const ViewChannelPartnerAPIReport = lazy(() => import('../pages/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPIReport'));

// Admin  CH Api Config -->
const CreateChannelPartnerAPIConfig = lazy(() => import('../pages/AdminModule/ChannelPartnerAPIConfig/CreateChannelPartnerAPIConfig'));
const EditChannelPartnerAPIConfig = lazy(() => import('../pages/AdminModule/ChannelPartnerAPIConfig/EditChannelPartnerAPIConfig'));
const ViewChannelPartnerAPIConfig = lazy(() => import('../pages/AdminModule/ChannelPartnerAPIConfig/ViewSpecificChannelPartnerAPIConfig'));
const ViewSpecificChannelPartnerAPIConfig = lazy(() => import('../pages/AdminModule/ChannelPartnerAPIConfig/ViewSpecificChannelPartnerAPIConfig'));

//BUSINESS PROFILE MODULE
const CreateServiceProvider = lazy(() => import('../pages/BusinessModule/ServiceProvider/CreateServiceProvider'));
const EditServiceProvider = lazy(() => import('../pages/BusinessModule/ServiceProvider/EditServiceProvider'));
const ViewServiceProvider = lazy(() => import('../pages/BusinessModule/ServiceProvider/ViewServiceProvider'));
const PendingServiceProvider = lazy(() => import('../pages/BusinessModule/ServiceProvider/PendingServiceProvider'));
const ViewSpecificServiceProvider = lazy(() => import('../pages/BusinessModule/ServiceProvider/ViewSpecificServiceProvider'));

const CreateFleetOwner = lazy(() => import('../pages/BusinessModule/FleetOwner/CreateFleetOwner'));
const EditFleetOwner = lazy(() => import('../pages/BusinessModule/FleetOwner/EditFleetOwner'));
const ViewFleetOwner = lazy(() => import('../pages/BusinessModule/FleetOwner/ViewFleetOwner'));
const ViewPendingFleetOwner = lazy(() => import('../pages/BusinessModule/FleetOwner/ViewPendingFleetOwner'));
const ViewTravelAgencySettings = lazy(() => import('../pages/BusinessModule/FleetOwner/TravelAgencySettings/ViewTravelAgencySettings'));
const TravelAgencySettingsModule = lazy(() => import('../pages/BusinessModule/FleetOwner/TravelAgencySettings/TravelAgencySettingsModule'));
const ViewSpecificFleetOwner = lazy(() => import('../pages/BusinessModule/FleetOwner/ViewSpecificFleetOwner'));

const CreateVehicleProfile = lazy(() => import('../pages/BusinessModule/VehicleProfile/CreateVehicleProfile'));
const EditVehicleProfile = lazy(() => import('../pages/BusinessModule/VehicleProfile/EditVehicleProfile'));
const ViewVehicleProfile = lazy(() => import('../pages/BusinessModule/VehicleProfile/ViewVehicleProfile'));
const PendingVehicleProfile = lazy(() => import('../pages/BusinessModule/VehicleProfile/PendingVehicleProfile'));
const ViewSpecificVehicleProfile = lazy(() => import('../pages/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile'));

// Subscription
const CreateSubscription = lazy(() => import('../pages/SubscriptionModule/Subscription/CreateSubscription'));
const EditSubscription = lazy(() => import('../pages/SubscriptionModule/Subscription/EditSubscription'));
const ViewSubscription = lazy(() => import('../pages/SubscriptionModule/Subscription/ViewSubscription'));
const ViewSpecificSubscription = lazy(() => import('../pages/SubscriptionModule/Subscription/ViewSpecificSubscription'));

const CreateSubscriptionAmtDistribution = lazy(() => import('../pages/SubscriptionModule/SubscriptionAmtDistribution/CreateSubscriptionAmtDistribution'));
const EditSubscriptionAmtDistribution = lazy(() => import('../pages/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution'));
const ViewSubscriptionAmtDistribution = lazy(() => import('../pages/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution'));
const ViewSpecificSubscriptionAmtDistribution = lazy(() => import('../pages/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution'));

const CreateVehicleSubsSettings = lazy(() => import('../pages/SubscriptionModule/VehicleSubsSettings/CreateVehicleSubsSettings'));
const EditVehicleSubsSettings = lazy(() => import('../pages/SubscriptionModule/VehicleSubsSettings/EditVehicleSubsSettings'));
const ViewSpecificVehicleSubsSettings = lazy(() => import('../pages/SubscriptionModule/VehicleSubsSettings/ViewSpecificVehicleSubsSettings'));
const ViewVehicleSubsSettings = lazy(() => import('../pages/SubscriptionModule/VehicleSubsSettings/ViewVehicleSubsSettings'));

const CreateSubscriptionHistory = lazy(() => import('../pages/SubscriptionModule/SubscriptionHistory/CreateSubscriptionHistory'));
const EditSubscriptionHistory = lazy(() => import('../pages/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory'));
const ViewSubscriptionHistory = lazy(() => import('../pages/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory'));
const ViewSpecificSubscriptionHistory = lazy(() => import('../pages/SubscriptionModule/SubscriptionHistory/ViewSpecificSubscriptionHistory'));

const CreateSubscriptionInvoice = lazy(() => import('../pages/SubscriptionModule/SubscriptionInvoice/CreateSubscriptionInvoice'));
const EditSubscriptionInvoice = lazy(() => import('../pages/SubscriptionModule/SubscriptionInvoice/EditSubscriptionInvoice'));
const ViewSubscriptionInvoice = lazy(() => import('../pages/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice'));
const ViewSpecificSubscriptionInvoice = lazy(() => import('../pages/SubscriptionModule/SubscriptionInvoice/ViewSpecificSubscriptionInvoice'));

// TRANSACTION MODULE OLD
// const CreateMoneyRequest = lazy(() => import('../pages/TransactionModule/MoneyRequest/CreateMoneyRequest'));
// const EditMoneyRequest = lazy(() => import('../pages/TransactionModule/MoneyRequest/EditMoneyRequest'));
// const ViewMoneyRequest = lazy(() => import('../pages/TransactionModule/MoneyRequest/ViewMoneyRequest'));
// const ViewSpecificMoneyRequest = lazy(() => import('../pages/TransactionModule/MoneyRequest/ViewSpecificMoneyRequest'));

// const CreateWalletMaster = lazy(() => import('../pages/TransactionModule/WalletMaster/CreateWalletMaster'));
// const EditWalletMaster = lazy(() => import('../pages/TransactionModule/WalletMaster/EditWalletMaster'));
// const ViewWalletMaster = lazy(() => import('../pages/TransactionModule/WalletMaster/ViewWalletMaster'));
// const ViewSpecificWalletMaster = lazy(() => import('../pages/TransactionModule/WalletMaster/ViewSpecificWalletMaster'));

// const CreateWalletHistory = lazy(() => import('../pages/TransactionModule/WalletHistory/CreateWalletHistory'));
// const EditWalletHistory = lazy(() => import('../pages/TransactionModule/WalletHistory/EditWalletHistory'));
// const ViewWalletHistory = lazy(() => import('../pages/TransactionModule/WalletHistory/ViewWalletHistory'));
// const ViewSpecificWalletHistory = lazy(() => import('../pages/TransactionModule/WalletHistory/ViewSpecificWalletHistory'));

// const CreateBankAccount = lazy(() => import('../pages/TransactionModule/BankAccount/CreateBankAccount'));
// const EditBankAccount = lazy(() => import('../pages/TransactionModule/BankAccount/EditBankAccount'));
// const ViewBankAccount = lazy(() => import('../pages/TransactionModule/BankAccount/ViewBankAccount'));
// const ViewSpecificBankAccount = lazy(() => import('../pages/TransactionModule/BankAccount/ViewSpecificBankAccount'));

// const CreatePGTransactions = lazy(() => import('../pages/TransactionModule/PGTransactions/CreatePGTransactions'));
// const EditPGTransactions = lazy(() => import('../pages/TransactionModule/PGTransactions/EditPGTransactions'));
// const ViewPGTransactions = lazy(() => import('../pages/TransactionModule/PGTransactions/ViewPGTransactions'));
// const ViewSpecificPGTransactions = lazy(() => import('../pages/TransactionModule/PGTransactions/ViewSpecificPGTransactions'));

// const CreateAppOfferedMoney = lazy(() => import('../pages/TransactionModule/AppOfferedMoney/CreateAppOfferedMoney'));
// const EditAppOfferedMoney = lazy(() => import('../pages/TransactionModule/AppOfferedMoney/EditAppOfferedMoney'));
// const ViewAppOfferedMoney = lazy(() => import('../pages/TransactionModule/AppOfferedMoney/ViewAppOfferedMoney'));
// const ViewSpecificAppOfferedMoney = lazy(() => import('../pages/TransactionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney'));

// const CreateAppOfferedMoneyHistory = lazy(() => import('../pages/TransactionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory'));
// const EditAppOfferedMoneyHistory = lazy(() => import('../pages/TransactionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory'));
// const ViewAppOfferedMoneyHistory = lazy(() => import('../pages/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory'));
// const ViewSpecificAppOfferedMoneyHistory = lazy(() => import('../pages/TransactionModule/AppOfferedMoneyHistory/ViewSpecificAppOfferedMoneyHistory'));

// -----------NEW TRANSACTION MODULE IMPORTS--------------------------------------------------------------------------------------

//wallet histroy
const ViewWalletHistory = lazy(() => import('../pages/WalletModule/WalletTransactionHistory/ViewWalletHistory'));
const ViewSpecificWalletHistory = lazy(() => import('../pages/WalletModule/WalletTransactionHistory/ViewSpecificWalletHistory'));

//wallet histroy
const ViewWalletList = lazy(() => import('../pages/WalletModule/WalletList/ViewWalletList'));

//wallet histroy
const ViewTransactionHistory = lazy(() => import('../pages/WalletModule/TransactionHistory/ViewTransactionHistory'));
const ViewSpecificTransactionHistory = lazy(() => import('../pages/WalletModule/TransactionHistory/ViewSpecificTransactionHistory'));

//wallet histroy
const ViewTownerCoins = lazy(() => import('../pages/WalletModule/TownerCoinsTransaction/ViewTownerCoins'));

//Bank account details
const ViewBankAccount = lazy(() => import('../pages/WalletModule/BankAccountDetails/ViewBankAccount'));
const CreateBankAccount = lazy(() => import('../pages/WalletModule/BankAccountDetails/CreateBankAccount'));
const ViewSpecificBankAccount = lazy(() => import('../pages/WalletModule/BankAccountDetails/ViewSpecificBankAccount'));
const EditBankAccount = lazy(() => import('../pages/WalletModule/BankAccountDetails/EditBankAccount'));

//PG Transaction
const CreatePGTransactions = lazy(() => import('../pages/WalletModule/PGTransactions/CreatePGTransactionsPage'));
const EditPGTransactions = lazy(() => import('../pages/WalletModule/PGTransactions/EditPGTransactionsPage'));
const ViewPGTransactions = lazy(() => import('../pages/WalletModule/PGTransactions/ViewPGTransactionsPage'));
const ViewSpecificPGTransactions = lazy(() => import('../pages/WalletModule/PGTransactions/ViewSpecificPGTransactionsPage'));

//Add Money
const AddMoneyToWallet = lazy(() => import('../pages/WalletModule/AddMoneyToWallet/AddMoneyToWalletPage'));
const ViewAddMoneyToWallet = lazy(() => import('../pages/WalletModule/AddMoneyToWallet/ViewAddMoneyToWallet'));
const ViewSpecificAddMoneyToWallet = lazy(() => import('../pages/WalletModule/AddMoneyToWallet/ViewSpecificAddMoneyToWallet'));

//Withdraw Money
const ViewWithdrawMoneyFromWallet = lazy(() => import('../pages/WalletModule/WithdrawMoneyFromWallet/ViewWithdrawMoneyFromWallet'));
const WithdrawMoneyFromWallet = lazy(() => import('../pages/WalletModule/WithdrawMoneyFromWallet/WithdrawMoneyFromWallet'));
const ViewSpecificWithdrawMoneyFromWallet = lazy(() => import('../pages/WalletModule/WithdrawMoneyFromWallet/ViewSpecificWithdrawMoneyFromWallet'));

//Subscription History
const ViewSubscriptionWalletHistroy = lazy(() => import('../pages/WalletModule/SubscriptionWalletHistroy/ViewSubscriptionWalletHistroy'));
const ViewSpecificSubscriptionWalletHistroy = lazy(() => import('../pages/WalletModule/SubscriptionWalletHistroy/ViewSpecificSubscriptionWalletHistroy'));

//Trip Transaction
const ViewTripTransaction = lazy(() => import('../pages/WalletModule/TripTransaction/ViewTripTransaction'));
const ViewSpecificTripTransaction = lazy(() => import('../pages/WalletModule/TripTransaction/ViewSpecificTripTransaction'));

//channel partner transaction

const ViewChannelPartnerTransaction = lazy(() => import('../pages/WalletModule/ChannelPartnerTransaction/ViewChannelPartnerTransaction'));
const ViewSpecificChannelPartnerTransaction = lazy(() => import('../pages/WalletModule/ChannelPartnerTransaction/ViewSpecificChannelPartnerTransaction'));

//distributor transaction

const ViewDistributorTransaction = lazy(() => import('../pages/WalletModule/DistributorTransaction/ViewDistributorTransaction'));
const ViewSpecificDistributorTransaction = lazy(() => import('../pages/WalletModule/DistributorTransaction/ViewSpecificDistributorTransaction'));

//internal user transaction

//send money

const ViewSendMoney = lazy(() => import('../pages/WalletModule/InternerUserTransaction/SendMoney/ViewSendMoney'));
const ViewSpecificSendMoney = lazy(() => import('../pages/WalletModule/InternerUserTransaction/SendMoney/ViewSpecificSendMoney'));

//recive money

const ViewRequestMoney = lazy(() => import('../pages/WalletModule/InternerUserTransaction/RequestMoney/ViewRequestMoney'));
const ViewSpecificRequestMoney = lazy(() => import('../pages/WalletModule/InternerUserTransaction/RequestMoney/ViewSpecificRequestMoney'));

// ------------------------------------------------------------------------------------------------

// PROMOTION MODULE
const CreateBonusMaster = lazy(() => import('../pages/PromotionModule/BonusMaster/CreateBonusMaster'));
const EditBonusMaster = lazy(() => import('../pages/PromotionModule/BonusMaster/EditBonusMaster'));
const ViewBonusMaster = lazy(() => import('../pages/PromotionModule/BonusMaster/ViewBonusMaster'));
const ViewSpecificBonusMaster = lazy(() => import('../pages/PromotionModule/BonusMaster/ViewSpecificBonusMaster'));

const CreateBonusHistory = lazy(() => import('../pages/PromotionModule/BonusHistory/CreateBonusHistory'));
const EditBonusHistory = lazy(() => import('../pages/PromotionModule/BonusHistory/EditBonusHistory'));
const ViewBonusHistory = lazy(() => import('../pages/PromotionModule/BonusHistory/ViewBonusHistory'));
const ViewSpecificBonusHistory = lazy(() => import('../pages/PromotionModule/BonusHistory/ViewSpecificBonusHistory'));

const CreateCouponMaster = lazy(() => import('../pages/PromotionModule/CouponMaster/CreateCouponMaster'));
const EditCouponMaster = lazy(() => import('../pages/PromotionModule/CouponMaster/EditCouponMaster'));
const ViewCouponMaster = lazy(() => import('../pages/PromotionModule/CouponMaster/ViewCouponMaster'));
const ViewSpecificCouponMaster = lazy(() => import('../pages/PromotionModule/CouponMaster/ViewSpecificCouponMaster'));

const CreateCouponHistory = lazy(() => import('../pages/PromotionModule/CouponHistory/CreateCouponHistory'));
const EditCouponHistory = lazy(() => import('../pages/PromotionModule/CouponHistory/EditCouponHistory'));
const ViewCouponHistory = lazy(() => import('../pages/PromotionModule/CouponHistory/ViewCouponHistory'));
const ViewSpecificCouponHistory = lazy(() => import('../pages/PromotionModule/CouponHistory/ViewSpecificCouponHistory'));

const CreateRefferalMaster = lazy(() => import('../pages/PromotionModule/RefferalMaster/CreateRefferalMaster'));
const EditRefferalMaster = lazy(() => import('../pages/PromotionModule/RefferalMaster/EditRefferalMaster'));
const ViewRefferalMaster = lazy(() => import('../pages/PromotionModule/RefferalMaster/ViewRefferalMaster'));
const ViewSpecificRefferalMaster = lazy(() => import('../pages/PromotionModule/RefferalMaster/ViewSpecificRefferalMaster'));

const CreateRefferalHistory = lazy(() => import('../pages/PromotionModule/RefferalHistory/CreateRefferalHistory'));
const EditRefferalHistory = lazy(() => import('../pages/PromotionModule/RefferalHistory/EditRefferalHistory'));
const ViewRefferalHistory = lazy(() => import('../pages/PromotionModule/RefferalHistory/ViewRefferalHistory'));
const ViewSpecificRefferalHistory = lazy(() => import('../pages/PromotionModule/RefferalHistory/ViewSpecificRefferalHistory'));

const CreatePromocodeMaster = lazy(() => import('../pages/PromotionModule/PromocodeMaster/CreatePromocodeMaster'));
const EditPromocodeMaster = lazy(() => import('../pages/PromotionModule/PromocodeMaster/EditPromocodeMaster'));
const ViewPromocodeMaster = lazy(() => import('../pages/PromotionModule/PromocodeMaster/ViewPromocodeMaster'));
const ViewSpecificPromocodeMaster = lazy(() => import('../pages/PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster'));

const CreatePromocodeHistory = lazy(() => import('../pages/PromotionModule/PromocodeHistory/CreatePromocodeHistory'));
const EditPromocodeHistory = lazy(() => import('../pages/PromotionModule/PromocodeHistory/EditPromocodeHistory'));
const ViewPromocodeHistory = lazy(() => import('../pages/PromotionModule/PromocodeHistory/ViewPromocodeHistory'));
const ViewSpecificPromocodeHistory = lazy(() => import('../pages/PromotionModule/PromocodeHistory/ViewSpecificPromocodeHistory'));

//wallet history
const ViewWalletHistoryPage = lazy(() => import('../pages/PromotionModule/WalletHistory/ViewWalletHistory'));
const ViewSpecificWalletHistroy = lazy(() => import('../pages/PromotionModule/WalletHistory/ViewSpecificWalletHistroy'));

//application offered money
const CreateAppOfferedMoney = lazy(() => import('../pages/PromotionModule/AppOfferedMoney/CreateAppOfferedMoney'));
const EditAppOfferedMoney = lazy(() => import('../pages/PromotionModule/AppOfferedMoney/EditAppOfferedMoney'));
const ViewAppOfferedMoney = lazy(() => import('../pages/PromotionModule/AppOfferedMoney/ViewAppOfferedMoney'));
const ViewSpecificAppOfferedMoney = lazy(() => import('../pages/PromotionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney'));

const CreateAppOfferedMoneyHistory = lazy(() => import('../pages/PromotionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory'));
const EditAppOfferedMoneyHistory = lazy(() => import('../pages/PromotionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory'));
const ViewAppOfferedMoneyHistory = lazy(() => import('../pages/PromotionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory'));
const ViewSpecificAppOfferedMoneyHistory = lazy(() => import('../pages/PromotionModule/AppOfferedMoneyHistory/ViewSpecificAppOfferedMoneyHistory'));

// TRIP MODULE---Not Needed
// const CreateVehicleTypes = lazy(() => import('../pages/TripModule/VehicleTypes/CreateVehicleTypes'));
// const EditVehicleTypes = lazy(() => import('../pages/TripModule/VehicleTypes/EditVehicleTypes'));
// const ViewVehicleTypes = lazy(() => import('../pages/TripModule/VehicleTypes/ViewVehicleTypes'));
// const ViewSpecificVehicleTypes = lazy(() => import('../pages/TripModule/TripSettings/VehicleType/ViewSpecificVehicleTypes'));

const CreateVehicleFareMaster = lazy(() => import('../pages/TripModule/VehicleFareMaster/CreateVehicleFareMaster'));
const EditVehicleFareMaster = lazy(() => import('../pages/TripModule/VehicleFareMaster/EditVehicleFareMaster'));
const ViewVehicleFareMaster = lazy(() => import('../pages/TripModule/VehicleFareMaster/ViewVehicleFareMaster'));
const ViewSpecificVehicleFareMaster = lazy(() => import('../pages/TripModule/VehicleFareMaster/ViewSpecificVehicleFareMaster'));

const CreateBookings = lazy(() => import('../pages/TripModule/Bookings/CreateBookings'));
const EditBookings = lazy(() => import('../pages/TripModule/Bookings/EditBookings'));
const ViewBookings = lazy(() => import('../pages/TripModule/Bookings/ViewBookings'));
const ViewSpecificBookings = lazy(() => import('../pages/TripModule/Bookings/ViewSpecificBookings'));

const CreateTrips = lazy(() => import('../pages/TripModule/Trips/AllTrips/CreateTrips'));
const EditTrips = lazy(() => import('../pages/TripModule/Trips/AllTrips/EditTrips'));
const ViewTrips = lazy(() => import('../pages/TripModule/Trips/AllTrips/ViewTrips'));
const ViewSpecificTrips = lazy(() => import('../pages/TripModule/Trips/AllTrips/ViewSpecificTrips'));

const CreateBookingAmtDistribution = lazy(() => import('../pages/TripModule/BookingAmtDistribution/CreateBookingAmtDistribution'));
const EditBookingAmtDistribution = lazy(() => import('../pages/TripModule/BookingAmtDistribution/EditBookingAmtDistribution'));
const ViewBookingAmtDistribution = lazy(() => import('../pages/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution'));
const ViewSpecificBookingAmtDistribution = lazy(() => import('../pages/TripModule/BookingAmtDistribution/ViewSpecificBookingAmtDistribution'));

const CreateTickets = lazy(() => import('../pages/TripModule/Tickets/CreateTickets'));
const EditTickets = lazy(() => import('../pages/TripModule/Tickets/EditTickets'));
const ViewTickets = lazy(() => import('../pages/TripModule/Tickets/ViewTickets'));
const ViewSpecificTickets = lazy(() => import('../pages/TripModule/Tickets/ViewSpecificTickets'));

const CreateTripsInvoice = lazy(() => import('../pages/TripModule/TripsInvoice/CreateTripsInvoice'));
const EditTripsInvoice = lazy(() => import('../pages/TripModule/TripsInvoice/EditTripsInvoice'));
const ViewTripsInvoice = lazy(() => import('../pages/TripModule/TripsInvoice/ViewTripsInvoice'));
const ViewSpecificTripsInvoice = lazy(() => import('../pages/TripModule/TripsInvoice/ViewSpecificTripsInvoice'));

//trip settings

//cancellation reason
const ViewCancellationReason = lazy(() => import('../pages/TripModule/TripSettings/CancellationReason/ViewCancellationReason'));
const ViewSpecificCancellationReason = lazy(() => import('../pages/TripModule/TripSettings/CancellationReason/ViewSpecificCancellationReason'));

//cancellation settings
const ViewCancellationSettings = lazy(() => import('../pages/TripModule/TripSettings/CancellationSettings/ViewCancellationSettings'));
const ViewSpecificCancellationSettings = lazy(() => import('../pages/TripModule/TripSettings/CancellationSettings/ViewSpecificCancellationSettings'));

//feedback reason
const ViewFeedBackReason = lazy(() => import('../pages/TripModule/TripSettings/FeedBackReason/ViewFeedBackReason'));
const ViewSpecificFeedBackReason = lazy(() => import('../pages/TripModule/TripSettings/FeedBackReason/ViewSpecificFeedBackReason'));

//Trip ratings
//feedback reason
const ViewTripRatings = lazy(() => import('../pages/TripModule/TripRatings/ViewTripRatings'));
const ViewSpecificTripRatings = lazy(() => import('../pages/TripModule/TripRatings/ViewSpecificTripRatings'));

//service type

//daily
const ViewDaily = lazy(() => import('../pages/TripModule/ServiceType/Daily/ViewDaily'));
const ViewSpecificDaily = lazy(() => import('../pages/TripModule/ServiceType/Daily/ViewSpecificDaily'));
const CreatDaily = lazy(() => import('../pages/TripModule/ServiceType/Daily/CreatDaily'));
const EditDaily = lazy(() => import('../pages/TripModule/ServiceType/Daily/EditDaily'));

//rental
const ViewRental = lazy(() => import('../pages/TripModule/ServiceType/Rental/ViewRental'));
const ViewSpecificRental = lazy(() => import('../pages/TripModule/ServiceType/Rental/ViewSpecificRental'));
const CreatRentalPackage = lazy(() => import('../pages/TripModule/ServiceType/Rental/CreatRentalPackage'));
const EditRentalPackage = lazy(() => import('../pages/TripModule/ServiceType/Rental/EditRentalPackage'));

//outstation
const ViewOutstation = lazy(() => import('../pages/TripModule/ServiceType/Outstation/ViewOutstation'));
const ViewSpecificOutstation = lazy(() => import('../pages/TripModule/ServiceType/Outstation/ViewSpecificOutstation'));
const CreatOutstation = lazy(() => import('../pages/TripModule/ServiceType/Outstation/CreatOutstation'));
const EditOutstation = lazy(() => import('../pages/TripModule/ServiceType/Outstation/EditOutstation'));

//Map view

//heat map
const ViewHeatMappage = lazy(() => import('../pages/TripModule/MapView/HeatMap/ViewHeatMap'));

//gods view
const ViewGodsViewpage = lazy(() => import('../pages/TripModule/MapView/GodsView/ViewGodsView'));

//driver tracking
const ViewDriverTracking = lazy(() => import('../pages/TripModule/MapView/DriverTracking/ViewDriverTracking'));

//dispatch

//manual dispatch
const ManualTaxiDispatch = lazy(() => import('../pages/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch'));

//pending request
const ViewPendingRequest = lazy(() => import('../pages/TripModule/Dispatch/PendingRequest/ViewPendingRequest'));
const ViewSpecificPendingRequest = lazy(() => import('../pages/TripModule/Dispatch/PendingRequest/ViewSpecificPendingRequest'));

//scheduled bookings
const ViewScheduledBooking = lazy(() => import('../pages/TripModule/Dispatch/ScheduledBooking/ViewScheduledBooking'));
const ViewSpecificScheduledBooking = lazy(() => import('../pages/TripModule/Dispatch/ScheduledBooking/ViewSpecificScheduledBooking'));

//RIDER MODULE--Not needed
// const ViewRiderUsers = lazy(() => import('../pages/RiderModule/RiderUsers/ViewRiderUsers'));
// const CreateRiderUsers = lazy(() => import('../pages/RiderModule/RiderUsers/CreateRiderUsers'));
// const EditRiderUsers = lazy(() => import('../pages/RiderModule/RiderUsers/EditRiderUsers'));
// const ViewSpecificRiderUsers = lazy(() => import('../pages/RiderModule/RiderUsers/ViewSpecificRiderUsers'));

// SETTINGS MODULE
const CreateSettingsPanel = lazy(() => import('../pages/SettingsModule/SettingsPanel/CreateSettingsPanel'));
const EditSettingsPanel = lazy(() => import('../pages/SettingsModule/SettingsPanel/EditSettingsPanel'));
const ViewSettingsPanel = lazy(() => import('../pages/SettingsModule/SettingsPanel/ViewSettingsPanel'));
const ViewSpecificSettingsPanel = lazy(() => import('../pages/SettingsModule/SettingsPanel/ViewSpecificSettingsPanel'));

const CreateEmailTemplate = lazy(() => import('../pages/SettingsModule/EmailTemplate/CreateEmailTemplate'));
const EditEmailTemplate = lazy(() => import('../pages/SettingsModule/EmailTemplate/EditEmailTemplate'));
const ViewEmailTemplate = lazy(() => import('../pages/SettingsModule/EmailTemplate/ViewEmailTemplate'));
const ViewSpecificEmailTemplate = lazy(() => import('../pages/SettingsModule/EmailTemplate/ViewSpecificEmailTemplate'));

const ViewReferralSettings = lazy(() => import('../pages/SettingsModule/ReferralSettings/ViewReferralSettings'));

//google settings

//map:
const ViewMap = lazy(() => import('../pages/SettingsModule/Google/Map/ViewMap'));

//firebase:
const ViewFireBase = lazy(() => import('../pages/SettingsModule/Google/FireBase/ViewFireBase'));

//azure settings

//Cloud:
const ViewCloud = lazy(() => import('../pages/SettingsModule/Azure/Cloud/ViewCloud'));

//doc verification:
const ViewDocVerification = lazy(() => import('../pages/SettingsModule/Azure/DocVerification/ViewDocVerification'));

//pg settings

//ViewCollect:
const ViewCollect = lazy(() => import('../pages/SettingsModule/PaymentGateway/Collect/ViewCollect'));

//payout:
const ViewPayOut = lazy(() => import('../pages/SettingsModule/PaymentGateway/PayOut/ViewPayOut'));

//third party settings

//document:
const ViewDocument = lazy(() => import('../pages/SettingsModule/ThirdParty/Document/ViewDocument'));

// UTILITY MODULE
const CreateCountry = lazy(() => import('../pages/UtilityModule/Country/CreateCountry'));
const EditCountry = lazy(() => import('../pages/UtilityModule/Country/EditCountry'));
const ViewCountry = lazy(() => import('../pages/UtilityModule/Country/ViewCountry'));
const ViewSpecificCountry = lazy(() => import('../pages/UtilityModule/Country/ViewSpecificCountry'));

const CreateState = lazy(() => import('../pages/UtilityModule/State/CreateState'));
const EditState = lazy(() => import('../pages/UtilityModule/State/EditState'));
const ViewState = lazy(() => import('../pages/UtilityModule/State/ViewState'));
const ViewSpecificState = lazy(() => import('../pages/UtilityModule/State/ViewSpecificState'));

const CreateCity = lazy(() => import('../pages/UtilityModule/City/CreateCity'));
const EditCity = lazy(() => import('../pages/UtilityModule/City/EditCity'));
const ViewCity = lazy(() => import('../pages/UtilityModule/City/ViewCity'));
const ViewSpecificCity = lazy(() => import('../pages/UtilityModule/City/ViewSpecificCity'));

// const CreateServiceCity = lazy(() => import('../pages/UtilityModule/ServiceCity/CreateServiceCity'));
// const EditServiceCity = lazy(() => import('../pages/UtilityModule/ServiceCity/EditServiceCity'));
// const ViewServiceCity = lazy(() => import('../pages/UtilityModule/ServiceCity/ViewServiceCity'));
// const ViewSpecificServiceCity = lazy(() => import('../pages/UtilityModule/ServiceCity/ViewSpecificServiceCity'));

const CreateStatus = lazy(() => import('../pages/UtilityModule/Status/CreateStatus'));
const EditStatus = lazy(() => import('../pages/UtilityModule/Status/EditStatus'));
const ViewStatus = lazy(() => import('../pages/UtilityModule/Status/ViewStatus'));
const ViewSpecificStatus = lazy(() => import('../pages/UtilityModule/Status/ViewSpecificStatus'));

const CreateTicketType = lazy(() => import('../pages/UtilityModule/TicketType/CreateTicketType'));
const EditTicketType = lazy(() => import('../pages/UtilityModule/TicketType/EditTicketType'));
const ViewTicketType = lazy(() => import('../pages/UtilityModule/TicketType/ViewTicketType'));
const ViewSpecificTicketType = lazy(() => import('../pages/UtilityModule/TicketType/ViewSpecificTicketType'));

const CreateAdminRole = lazy(() => import('../pages/UtilityModule/AdminUtility/AdminRole/CreateAdminRole'));
const EditAdminRole = lazy(() => import('../pages/UtilityModule/AdminUtility/AdminRole/EditAdminRole'));
const ViewAdminRole = lazy(() => import('../pages/UtilityModule/AdminUtility/AdminRole/ViewAdminRole'));
const ViewSpecificAdminRole = lazy(() => import('../pages/UtilityModule/AdminUtility/AdminRole/ViewSpecificAdminRole'));

const CreateModuleMaster = lazy(() => import('../pages/UtilityModule/ModuleMaster/CreateModuleMaster'));
const EditModuleMaster = lazy(() => import('../pages/UtilityModule/ModuleMaster/EditModuleMaster'));
const ViewModuleMaster = lazy(() => import('../pages/UtilityModule/ModuleMaster/ViewModuleMaster'));
const ViewSpecificModuleMaster = lazy(() => import('../pages/UtilityModule/ModuleMaster/ViewSpecificModuleMaster'));

const CreateDocumentType = lazy(() => import('../pages/UtilityModule/DocumentType/CreateDocumentType'));
const EditDocumentType = lazy(() => import('../pages/UtilityModule/DocumentType/EditDocumentType'));
const ViewDocumentType = lazy(() => import('../pages/UtilityModule/DocumentType/ViewDocumentType'));
const ViewSpecificDocumentType = lazy(() => import('../pages/UtilityModule/DocumentType/ViewSpecificDocumentType'));

const CreateChannelPartnerType = lazy(() => import('../pages/UtilityModule/ChannelPartnerType/CreateChannelPartnerType'));
const EditChannelPartnerType = lazy(() => import('../pages/UtilityModule/ChannelPartnerType/EditChannelPartnerType'));
const ViewChannelPartnerType = lazy(() => import('../pages/UtilityModule/ChannelPartnerType/ViewChannelPartnerType'));
const ViewSpecificChannelPartnerType = lazy(() => import('../pages/UtilityModule/ChannelPartnerType/ViewSpecificChannelPartnerType'));

const CreateEmployeeLevel = lazy(() => import('../pages/UtilityModule/AdminUtility/EmployeeLevel/CreateEmployeeLevel'));
const EditEmployeeLevel = lazy(() => import('../pages/UtilityModule/AdminUtility/EmployeeLevel/EditEmployeeLevel'));
const ViewEmployeeLevel = lazy(() => import('../pages/UtilityModule/AdminUtility/EmployeeLevel/ViewEmployeeLevel'));
const ViewSpecificEmployeeLevel = lazy(() => import('../pages/UtilityModule/AdminUtility/EmployeeLevel/ViewSpecificEmployeeLevel'));

const CreateCompanyType = lazy(() => import('../pages/UtilityModule/AdminUtility/CompanyType/CreateCompanyType'));
const EditCompanyType = lazy(() => import('../pages/UtilityModule/AdminUtility/CompanyType/EditCompanyType'));
const ViewCompanyType = lazy(() => import('../pages/UtilityModule/AdminUtility/CompanyType/ViewCompanyType'));
const ViewSpecificCompanyType = lazy(() => import('../pages/UtilityModule/AdminUtility/CompanyType/ViewSpecificCompanyType'));

const CreateVehicleUtility = lazy(() => import('../pages/UtilityModule/VehicleUtility/CreateVehicleUtility'));
const EditVehicleUtility = lazy(() => import('../pages/UtilityModule/VehicleUtility/EditVehicleUtility'));
const ViewVehicleUtility = lazy(() => import('../pages/UtilityModule/VehicleUtility/ViewVehicleUtility'));
const ViewSpecificVehicleUtility = lazy(() => import('../pages/UtilityModule/VehicleUtility/ViewSpecificVehicleUtility'));

const ViewAppLaguage = lazy(() => import('../pages/UtilityModule/AppLaguage/ViewAppLaguage'));
const CreateAppLanguage = lazy(() => import('../pages/UtilityModule/AppLaguage/CreateAppLanguage'));
const ViewSpecificAppLan = lazy(() => import('../pages/UtilityModule/AppLaguage/ViewSpecificAppLan'));
const EditAppLan = lazy(() => import('../pages/UtilityModule/AppLaguage/EditAppLan'));

const ViewCancellationReasons = lazy(() => import('../pages/UtilityModule/CancellationReasons/ViewCancellationReasons'));
const CreateCancellationReason = lazy(() => import('../pages/UtilityModule/CancellationReasons/CreateCancellationReason'));
const ViewSpecificCancellation = lazy(() => import('../pages/UtilityModule/CancellationReasons/ViewSpecificCancellation'));
const EditCancellation = lazy(() => import('../pages/UtilityModule/CancellationReasons/EditCancellation'));

const ViewFeedbackReasons = lazy(() => import('../pages/UtilityModule/FeedbackReasons/ViewFeedbackReasons'));
const CreateFeedBackReason = lazy(() => import('../pages/UtilityModule/FeedbackReasons/CreateFeedBackReason'));
const EditFeedbackReason = lazy(() => import('../pages/UtilityModule/FeedbackReasons/EditFeedbackReason'));
const ViewSpecificFeedbackReason = lazy(() => import('../pages/UtilityModule/FeedbackReasons/ViewSpecificFeedbackReason'));

const ViewCurrencyManagement = lazy(() => import('../pages/UtilityModule/CurrencyManagement/ViewCurrencyManagement'));
const CreateCurrencyData = lazy(() => import('../pages/UtilityModule/CurrencyManagement/CreateCurrencyData'));
const EditCurrency = lazy(() => import('../pages/UtilityModule/CurrencyManagement/EditCurrency'));
const ViewSpecificCurrency = lazy(() => import('../pages/UtilityModule/CurrencyManagement/ViewSpecificCurrency'));

const ViewOfficeDetails = lazy(() => import('../pages/UtilityModule/OfficeDetails/ViewOfficeDetails'));
const CreateOfficeDetails = lazy(() => import('../pages/UtilityModule/OfficeDetails/CreateOfficeDetails'));
const ViewSpecificOfficeDetails = lazy(() => import('../pages/UtilityModule/OfficeDetails/ViewSpecificOfficeDetails'));
const EditOfficeDetails = lazy(() => import('../pages/UtilityModule/OfficeDetails/EditOfficeDetails'));

const ViewVehicleColor = lazy(() => import('../pages/UtilityModule/VehicleColor/ViewVehicleColor'));
const CreateVehicleColor = lazy(() => import('../pages/UtilityModule/VehicleColor/CreateVehicleColor'));
const ViewSpecificVehicleColor = lazy(() => import('../pages/UtilityModule/VehicleColor/ViewSpecificVehicleColor'));
const EditVehicleColor = lazy(() => import('../pages/UtilityModule/VehicleColor/EditVehicleColor'));

const ViewVehicleFuel = lazy(() => import('../pages/UtilityModule/VehicleFuel/ViewVehicleFuel'));
const CreateVehicleFuel = lazy(() => import('../pages/UtilityModule/VehicleFuel/CreateVehicleFuel'));
const ViewSpecificVehicleFuel = lazy(() => import('../pages/UtilityModule/VehicleFuel/ViewSpecificVehicleFuel'));
const EditVehicleFuel = lazy(() => import('../pages/UtilityModule/VehicleFuel/EditVehicleFuel'));

const CreatePriority = lazy(() => import('../pages/UtilityModule/Priority/CreatePriority'));
const ViewPriority = lazy(() => import('../pages/UtilityModule/Priority/ViewPriority'));
const ViewSpecificPriority = lazy(() => import('../pages/UtilityModule/Priority/ViewSpecificPriority'));
const EditPriority = lazy(() => import('../pages/UtilityModule/Priority/EditPriority'));

const CreateDistributorRoleType = lazy(() => import('../pages/UtilityModule/AdminUtility/DistributorRoleType/CreateDistributorRoleType'));
const ViewDistributorRoleType = lazy(() => import('../pages/UtilityModule/AdminUtility/DistributorRoleType/ViewDistributorRoleType'));
const ViewSpecificDistributorRoleType = lazy(() => import('../pages/UtilityModule/AdminUtility/DistributorRoleType/ViewSpecificDistributorRoleType'));
const EditDistributorRoleType = lazy(() => import('../pages/UtilityModule/AdminUtility/DistributorRoleType/EditDistributorRoleType'));

// SERVER CONFIG MODULE
const ViewGeneralSettings = lazy(() => import('../pages/ServerConfigModule/GeneralSettings/ViewGeneralSettings'));
const ViewFirebaseSettings = lazy(() => import('../pages/ServerConfigModule/FirebaseSettings/ViewFirebaseSettings'));
const ViewEmailConfigurations = lazy(() => import('../pages/ServerConfigModule/EmailConfigurations/ViewEmailConfigurations'));
const ViewSMSConfigurations = lazy(() => import('../pages/ServerConfigModule/SMSConfigurations/ViewSMSConfigurations'));
const ViewPaymentGatewayConfigurations = lazy(() => import('../pages/ServerConfigModule/PaymentGatewayConfigurations/ViewPaymentGatewayConfigurations'));

// SOS Module
const ViewSOS = lazy(() => import('../pages/SOSModule/SOS/ViewSOS'));
const ViewSpecificSOS = lazy(() => import('../pages/SOSModule/SOS/ViewSpecificSOS'));

// PAGES CONFIG MODULE
const ViewRentailsTnC = lazy(() => import('../pages/PagesModule/RentailsTnC/ViewRentailsTnC'));
const EditRentailsTnC = lazy(() => import('../pages/PagesModule/RentailsTnC/EditRentailsTnC'));

const ViewOutstationsTnc = lazy(() => import('../pages/PagesModule/OutstationsTnc/ViewOutstationsTnc'));
const EditOutstationsTnc = lazy(() => import('../pages/PagesModule/OutstationsTnc/EditOutstationsTnc'));

const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'));
const CancellationSettings = lazy(() => import('../pages/CancellationSettings/CancellationSettings'));

//Remove the files not needed
// const Demographics = lazy(() => import('../pages/Demographics/Demographics'));
// const RentalPackage = lazy(() => import('../pages/RentalPackage/RentalPackage'));
// const OutstationPackage = lazy(() => import('../pages/OutstationPackage/OutstationPackage'));
// const HailTrip = lazy(() => import('../pages/HailTrip/HailTrip'));

// Map View Module--Remove the files
// const ViewHeatMap = lazy(() => import('../pages/MapViewModule/HeatMap/ViewHeatMap'));
// const ViewGodsView = lazy(() => import('../pages/MapViewModule/GodsView/ViewGodsView'));
// const ViewDriversTracking = lazy(() => import('../pages/MapViewModule/DriversTracking/ViewDriversTracking'));

// Ratings & Review Module--Remove the files
// const ViewDriver = lazy(() => import('../pages/RatingsReviewModule/Driver/ViewDriver'));
// const ViewRider = lazy(() => import('../pages/RatingsReviewModule/Rider/ViewRider'));

// APP CMS Module
const ViewColors = lazy(() => import('../pages/APPCMSModule/Colors/ViewColors'));
const ViewYears = lazy(() => import('../pages/APPCMSModule/Years/ViewYears'));
const ViewAboutUs = lazy(() => import('../pages/APPCMSModule/AboutUs/ViewAboutUs'));
const ViewRiderPrivacy = lazy(() => import('../pages/APPCMSModule/RiderPrivacy/ViewRiderPrivacy'));
const ViewRiderTermsAndConditions = lazy(() => import('../pages/APPCMSModule/RiderTermsAndConditions/ViewRiderTermsAndConditions'));
const ViewDriverTermsandConditions = lazy(() => import('../pages/APPCMSModule/DriverTermsandConditions/ViewDriverTermsandConditions'));

// Send Notifications Module
const ViewEmail = lazy(() => import('../pages/SendNotificationsModule/Email/ViewEmail'));
const ViewNotification = lazy(() => import('../pages/SendNotificationsModule/Notification/ViewNotification'));

// Reports Module
const ViewTripPayments = lazy(() => import('../pages/ReportsModule/TripPayments/ViewTripPayments'));
const ViewSpecificTripPayments = lazy(() => import('../pages/ReportsModule/TripPayments/ViewSpecificTripPayments'));

const ViewDriverDutyReport = lazy(() => import('../pages/ReportsModule/DriverDutyReport/ViewDriverDutyReport'));
const ViewSpecificDriverDutyReport = lazy(() => import('../pages/ReportsModule/DriverDutyReport/ViewSpecificDriverDutyReport'));

const ViewTripPromoDiscounts = lazy(() => import('../pages/ReportsModule/TripPromoDiscounts/ViewTripPromoDiscounts'));
const ViewSpecificTripPromoDiscounts = lazy(() => import('../pages/ReportsModule/TripPromoDiscounts/ViewSpecificTripPromoDiscounts'));

const ViewDriverPayments = lazy(() => import('../pages/ReportsModule/DriverPayments/ViewDriverPayments'));
const ViewSpecificDriverPayments = lazy(() => import('../pages/ReportsModule/DriverPayments/ViewSpecificDriverPayments'));

// Total Trips Report Module
const TotalTrips = lazy(() => import('../pages/ReportsModule/TotalTrip/TotalTrip'));

// Total Cancelled Trips Report Module
const TotalCancelledTrips = lazy(() => import('../pages/ReportsModule/TotalCancelledTrips/TotalCancelledTrips'));

// Total Scheduled Trips Report Module
const TotalScheduledTrips = lazy(() => import('../pages/ReportsModule/TotalScheduledTrips/TotalScheduledTrips'));

// Total Kilometers Travelled Report Module
const TotalKmsTravelled = lazy(() => import('../pages/ReportsModule/TotalKmsTraveled/TotalKmsTraveled'));

// Total Trip Amount Report Module
const TotalTripAmount = lazy(() => import('../pages/ReportsModule/TotalTripAmount/TotalTripAmount'));

// Total AI Recognitions Report Module
const TotalAlRecognitions = lazy(() => import('../pages/ReportsModule/TotalAiRecognitions/TotalAiRecognitions'));

// Total Driver Earned Report Module
const TotalDriverEarned = lazy(() => import('../pages/ReportsModule/TotalDriverEarned/TotalDriverEarned'));

// Total Days with Towner Report Module
const TotalDaysWithTowner = lazy(() => import('../pages/ReportsModule/TotalDaysWithTowner/TotalDaysWithTowner'));

// Total Wallet Added Amount Report Module
const TotalWalletAddedAmount = lazy(() => import('../pages/ReportsModule/TotalWalletAddedAmount/TotalWalletAddedAmount'));

// Total Coupons Claimed Report Module
const TotalCouponsClaimed = lazy(() => import('../pages/ReportsModule/TotalCouponClaimed/TotalCouponClaimed'));

// Total Wallet Bonus Received Report Module
const TotalWalletBonusReceived = lazy(() => import('../pages/ReportsModule/TotalWalletBonusRecived/TotalWalletBonusRecived'));

// Total Subscription Report Module
const TotalSubscription = lazy(() => import('../pages/ReportsModule/TotalSubscription/TotalSubscription'));

// Total Ratings Given Report Module
const TotalRatingsGiven = lazy(() => import('../pages/ReportsModule/TotalRatingsGivenByHim/TotalRatingsGivenByHim'));

// Total Ratings Received Report Module
const TotalRatingsReceived = lazy(() => import('../pages/ReportsModule/TotalRatingRecived/TotalRatingRecived'));

// Total Referral Bonus Report Module
const TotalReferralBonus = lazy(() => import('../pages/ReportsModule/TotalRefferalBonus/TotalRefferalBonus'));

// Total Friends Invited Report Module
const TotalFriendsInvited = lazy(() => import('../pages/ReportsModule/TotalFriendsInvitedTrips/TotalFriendsInvitedTrips'));

// Total Tickets Raised Report Module
const TotalTicketsRaised = lazy(() => import('../pages/ReportsModule/TotalTicketsRised/TotalTicketsRised'));

// Discounts Given Report Module
const DiscountsGiven = lazy(() => import('../pages/ReportsModule/DiscountsGiven/DiscountsGiven'));

// Total Working Hours Report Module
const TotalWorkingHours = lazy(() => import('../pages/ReportsModule/TotalWorkingHours/TotalWorkingHours'));

// Total Password Reset Report Module
const TotalPasswordReset = lazy(() => import('../pages/ReportsModule/TotalPasswordReset/TotalPasswordReset'));

// Total Expense Report Module
const TotalExpense = lazy(() => import('../pages/ReportsModule/TotalExpence/TotalExpence'));

// Total Profile Registered Report Module
const TotalProfileRegistered = lazy(() => import('../pages/ReportsModule/TotalProfileRegistered/TotalProfileRegistered'));

// Total Wallet Pay Received Report Module
const TotalCountOfWalletPayRecived = lazy(() => import('../pages/ReportsModule/TotalCountOfWalletPayRecived/TotalCountOfWalletPayRecived'));

// Total Wallet Pay Received Report Module
const TotalCountOfWalletPaySent = lazy(() => import('../pages/ReportsModule/TotalCountOfWalletPaySent/TotalCountOfWalletPaySent'));

//User management module
const ViewUsers = lazy(() => import('../pages/UserManagement/Users/ViewUsers'));
const ViewCategory = lazy(() => import('../pages/UserManagement/Category/ViewCategory'));
const ViewSpecificCategory = lazy(() => import('../pages/UserManagement/Category/ViewSpecificCategory'));

//COMMUNITY MODULE

const ViewListCommunity = lazy(() => import('../pages/CommunityModule/Community/ViewListCommunity'));
const CreateCommunity = lazy(() => import('../pages/CommunityModule/Community/CreateCommunity'));
const EditCommunity = lazy(() => import('../pages/CommunityModule/Community/EditCommunity'));
const ViewSpecificCommunity = lazy(() => import('../pages/CommunityModule/Community/ViewSpecificCommunity'));

//UPDATED TRIP MODULE
//SERVICE CITY SUB MODULE
const ViewServiceCity = lazy(() => import('../pages/TripModule/TripSettings/ServiceCity/ViewServiceCity'));
const CreateServiceCity = lazy(() => import('../pages/TripModule/TripSettings/ServiceCity/CreateServiceCity'));
const EditServiceCity = lazy(() => import('../pages/TripModule/TripSettings/ServiceCity/EditServiceCity'));
const ViewSpecificServiceCity = lazy(() => import('../pages/TripModule/TripSettings/ServiceCity/ViewSpecificServiceCity'));

//SERVICE TYPE SUB MODULE
const ViewServiceType = lazy(() => import('../pages/TripModule/TripSettings/ServiceType/ViewServiceType'));
const CreateServiceType = lazy(() => import('../pages/TripModule/TripSettings/ServiceType/CreateServiceType'));
const EditServiceType = lazy(() => import('../pages/TripModule/TripSettings/ServiceType/EditServiceType'));
const ViewSpecificServiceType = lazy(() => import('../pages/TripModule/TripSettings/ServiceType/ViewSpecificServiceType'));

//VEHICLE TYPE SUB MODULE
const ViewVehicleType = lazy(() => import('../pages/TripModule/TripSettings/VehicleTypes/ViewVehicleTypes'));
const CreateVehicleType = lazy(() => import('../pages/TripModule/TripSettings/VehicleTypes/CreateVehicleTypes'));
const EditVehicleType = lazy(() => import('../pages/TripModule/TripSettings/VehicleTypes/EditVehicleTypes'));
const ViewSpecificVehicleType = lazy(() => import('../pages/TripModule/TripSettings/VehicleTypes/ViewSpecificVehicleTypes'));

//UPDATED STRUCTURE TRIP MODULES
//TRIPS SUB MODULE
const ViewHailTrips = lazy(() => import('../pages/TripModule/Trips/HailTrips/ViewHailTrips'));

const NoResponseTrips = lazy(() => import('../pages/TripModule/Trips/NoResponseTrips/ViewNoResponse'));

const OnGoingTrips = lazy(() => import('../pages/TripModule/Trips/OnGoingTrips/ViewOnGoingTrips'));

const PastTrips = lazy(() => import('../pages/TripModule/Trips/PastTrips/ViewPastTrips'));

const SheduledTrips = lazy(() => import('../pages/TripModule/Trips/SheduledTrips/ViewSheduleTrips'));

const ViewCancelledTrips = lazy(() => import('../pages/TripModule/Trips/CancelledTrips/ViewCancelledTrips'));

// future code -->>
// let userRolesAndPermissions = JSON.parse(localStorage.getItem('userRolesAndPermissions') || '{}');
let userRolesAndPermissions = JSON.parse(localStorage.getItem('userRolesAndPermissions') ?? '{}');

const routes = [
    //Dashboard
    {
        path: '/',
        element: <AuthHOC roles={['ADMIN']}>{<Index />}</AuthHOC>,
        layout: 'default',
    },
    //Authentication
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    //Roles Module
    {
        path: '/AdminModule/Roles/CreateRoles',
        element: <AuthHOC roles={['ADMIN']}>{<CreateRoles />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Roles/EditRoles/:roleId',
        element: <AuthHOC roles={['ADMIN']}>{<EditRoles />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Roles/ViewRoles',
        element: <AuthHOC roles={['ADMIN']}>{<ViewRoles />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Roles/ViewSpecificRoles/:roleId',
        element: <AuthHOC roles={['ADMIN']}>{<ViewSpecificRoles />}</AuthHOC>,
    },
    //Admin Module
    {
        path: '/AdminModule/Admin/CreateAdmin',
        element: <AuthHOC roles={['ADMIN']}>{<CreateAdmin />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Admin/EditAdmin/:adminId',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<EditAdmin />}</AuthHOC>,
    },

    // userRolesAndPermissions[0]["ADMIN"]["ADMINREAD"]["permissionStatus"] ?
    // {
    //     path: '/AdminModule/Admin/ViewAdmin',
    //     element: <AuthHOC roles={['Admin', 'editor']} >{<ViewAdmin />}</AuthHOC>,
    // } : <PermissionDenied /> ,

    {
        path: '/AdminModule/Admin/ViewAdmin',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewAdmin />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Admin/PendingAdmin',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<PendingAdmin />}</AuthHOC>,
    },
    {
        path: '/AdminModule/Admin/ViewSpecificAdmin/:admin',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewSpecificAdmin />}</AuthHOC>,
    },
    //Admin Teams Module
    {
        path: '/AdminModule/AdminTeams/CreateAdminTeams',
        element: <CreateAdminTeams />,
    },
    {
        path: '/AdminModule/AdminTeams/EditAdminTeams/:adminTeamsId',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<EditAdminTeams />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTeams/ViewAdminTeams',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewAdminTeams tabs={false} />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTeams/ViewSpecificAdminTeams/:adminTeamsId',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewSpecificAdminTeams />}</AuthHOC>,
    },

    {
        path: '/AdminModule/AdminTeams/MyTeam/ViewMyTeam',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewMyTeam tabs={false} />}</AuthHOC>,
    },

    //Admin Tickets Module
    {
        path: '/adminModule/adminTickets/createAdminTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<CreateAdminTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/EditAdminTickets/:adminTicketsId',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<EditAdminTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/ViewAdminTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewAdminTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/PendingAdminTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<PendingAdminTickets />}</AuthHOC>,
    },

    {
        path: '/AdminModule/AdminTickets/ViewSpecificAdminTickets/:adminTicketsId',
        element: <ViewSpecificAdminTickets />,
    },

    {
        path: '/AdminModule/AdminTickets/RaisedAgainstMeTickets/ViewRaisedAgainstMeTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewRaisedAgainstMeTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/RaisedByMeTickets/ViewRaisedByMeTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewRaisedByMeTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/OpenTickets/ViewOpenTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewOpenTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/ClosedTickets/ViewClosedTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewClosedTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/ReopenTickets/ViewReopenTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewReopenTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/InProgressTickets/ViewInProgressTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewInProgressTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/UnresolvedTickets/ViewUnresolvedTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewUnresolvedTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/CompletedTickets/ViewCompletedTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewCompletedTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/TicketsRaisedByAdmin/ViewTicketsRaisedByAdmin',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewTicketsRaisedByAdmin />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/ChannelPartnerTickets/ViewChannelPartnerTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewChannelPartnerTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/DriverTickets/ViewDriverTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewDriverTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/TravelAgencyTickets/ViewTravelAgencyTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewTravelAgencyTickets />}</AuthHOC>,
    },
    {
        path: '/AdminModule/AdminTickets/DistributorTickets/ViewDistributorTickets',
        element: <AuthHOC roles={['ADMIN', 'editor']}>{<ViewDistributorTickets />}</AuthHOC>,
    },

    //Channel Partner Module
    {
        path: '/AdminModule/ChannelPartner/CreateChannelPartner',
        element: <CreateChannelPartner />,
    },
    {
        path: '/AdminModule/ChannelPartner/EditChannelPartner/:channelPartnerId',
        element: <EditChannelPartner />,
    },
    {
        path: '/AdminModule/ChannelPartner/ViewChannelPartner',
        element: <ViewChannelPartner userManagementPage={false} tabs={false} />,
    },
    {
        path: '/AdminModule/ChannelPartner/ViewSpecificChannelPartner/:channelPartnerId',
        element: <ViewSpecificChannelPartner />,
    },
    //Distributor Module
    {
        path: '/AdminModule/Distributor/CreateDistributor',
        element: <CreateDistributor />,
    },
    {
        path: '/AdminModule/Distributor/EditDistributor/:distributorID',
        element: <EditDistributor />,
    },
    {
        path: '/AdminModule/Distributor/ViewDistributor',
        element: <ViewDistributor />,
    },
    {
        path: '/AdminModule/Distributor/ViewSpecificDistributor/:distributorID',
        element: <ViewSpecificDistributor />,
    },

    {
        path: '/AdminModule/Distributor/SubDistributor/ViewSubDistributor',
        element: <ViewSubDistributor />,
    },

    {
        path: '/AdminModule/Distributor/DistributorSettings/CreateDistributorSettings',
        element: <CreateDistributorSettings />,
    },

    {
        path: '/AdminModule/Distributor/DistributorSettings/EditDistributorSettings/:distributorSettingsID',
        element: <EditDistributorSettings />,
    },

    {
        path: 'AdminModule/Distributor/DistributorSettings/ViewDistributorSettings',
        element: <ViewDistributorSettings />,
    },

    {
        path: '/AdminModule/Distributor/DistributorSettings/ViewSpecificDistributorSettings/:distributorSettingsID',
        element: <ViewSpecificDistributorSettings tabs={false} />,
    },

    //Channel Partner API Module
    {
        path: '/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI',
        element: <CreateChannelPartnerAPI />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPI/EditChannelPartnerAPI/:channelPartnerAPIId',
        element: <EditChannelPartnerAPI />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI',
        element: <ViewChannelPartnerAPI />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPI/ViewSpecificChannelPartnerAPI/:channelPartnerAPIId',
        element: <ViewSpecificChannelPartnerAPI />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPIReport',
        element: <ViewChannelPartnerAPIReport />,
    },

    //Channel Partner API Config Module
    {
        path: '/AdminModule/ChannelPartnerAPIConfig/CreateChannelPartnerAPIConfig',
        element: <CreateChannelPartnerAPIConfig />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPIConfig/EditChannelPartnerAPIConfig/:channelPartnerAPIConfigId',
        element: <EditChannelPartnerAPIConfig />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig',
        element: <ViewChannelPartnerAPIConfig />,
    },
    {
        path: '/AdminModule/ChannelPartnerAPIConfig/ViewSpecificChannelPartnerAPIConfig/:channelPartnerAPIConfigId',
        element: <ViewSpecificChannelPartnerAPIConfig />,
    },
    //SOS Module
    {
        path: '/SOSModule/SOS/ViewSOS',
        element: <ViewSOS />,
    },
    {
        path: '/SOSModule/SOS/ViewSpecificSOS/:SOSId',
        element: <ViewSpecificSOS />,
    },
    //Driver Module
    {
        path: '/BusinessModule/ServiceProvider/CreateServiceProvider',
        element: <CreateServiceProvider />,
    },
    {
        path: '/BusinessModule/ServiceProvider/EditServiceProvider/:serviceProviderId',
        element: <EditServiceProvider />,
    },
    {
        path: '/BusinessModule/ServiceProvider/ViewServiceProvider',
        element: <ViewServiceProvider tabs={false} />,
    },
    {
        path: '/BusinessModule/ServiceProvider/PendingServiceProvider',
        element: <PendingServiceProvider tabs={false} />,
    },
    {
        path: '/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/:serviceProviderId',
        element: <ViewSpecificServiceProvider />,
    },
    //Travel Agency Module
    {
        path: '/BusinessModule/FleetOwner/CreateFleetOwner',
        element: <CreateFleetOwner />,
    },
    {
        path: '/BusinessModule/FleetOwner/EditFleetOwner/:fleetOwnerId',
        element: <EditFleetOwner />,
    },
    {
        path: '/BusinessModule/FleetOwner/ViewFleetOwner',
        element: <ViewFleetOwner />,
    },

    {
        path: '/BusinessModule/FleetOwner/ViewPendingFleetOwner',
        element: <ViewPendingFleetOwner />,
    },

    {
        path: '/BusinessModule/FleetOwner/TravelAgencySettings/ViewTravelAgencySettings',
        element: <ViewTravelAgencySettings />,
    },
    {
        path: '/BusinessModule/FleetOwner/TravelAgencySettings/TravelAgencySettingsModule/:agencyID',
        element: <TravelAgencySettingsModule />,
    },
    {
        path: '/BusinessModule/FleetOwner/ViewSpecificFleetOwner/:fleetOwnerId',
        element: <ViewSpecificFleetOwner />,
    },

    //Vehicle Module
    {
        path: '/BusinessModule/VehicleProfile/CreateVehicleProfile',
        element: <CreateVehicleProfile />,
    },
    {
        path: '/BusinessModule/VehicleProfile/EditVehicleProfile/:vehicleProfileId',
        element: <EditVehicleProfile />,
    },
    {
        path: '/BusinessModule/VehicleProfile/ViewVehicleProfile',
        element: <ViewVehicleProfile tabs={false} />,
    },
    {
        path: '/BusinessModule/VehicleProfile/PendingVehicleProfile',
        element: <PendingVehicleProfile tabs={false} />,
    },
    {
        path: '/BusinessModule/VehicleProfile/ViewSpecificVehicleProfile/:vehicleProfileId',
        element: <ViewSpecificVehicleProfile />,
    },
    //Subscription Module
    {
        path: '/SubscriptionModule/Subscription/CreateSubscription',
        element: <CreateSubscription />,
    },
    {
        path: '/SubscriptionModule/Subscription/EditSubscription/:subscriptionId',
        element: <EditSubscription />,
    },
    {
        path: '/SubscriptionModule/Subscription/ViewSubscription',
        element: <ViewSubscription />,
    },
    {
        path: '/SubscriptionModule/Subscription/ViewSpecificSubscription/:subscriptionId',
        element: <ViewSpecificSubscription />,
    },
    //Subscription Amount Distribution Module
    {
        path: '/SubscriptionModule/SubscriptionAmtDistribution/CreateSubscriptionAmtDistribution',
        element: <CreateSubscriptionAmtDistribution />,
    },
    {
        path: '/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/:subscriptionAmtDistributionId',
        element: <EditSubscriptionAmtDistribution />,
    },
    {
        path: '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution',
        element: <ViewSubscriptionAmtDistribution />,
    },
    {
        path: '/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution/:subscriptionAmtDistributionId',
        element: <ViewSpecificSubscriptionAmtDistribution />,
    },

    //vehicle subs settings

    {
        path: '/SubscriptionModule/VehicleSubsSettings/CreateVehicleSubsSettings',
        element: <CreateVehicleSubsSettings />,
    },
    {
        path: '/SubscriptionModule/VehicleSubsSettings/EditVehicleSubsSettings/:settingsId',
        element: <EditVehicleSubsSettings />,
    },
    {
        path: '/SubscriptionModule/VehicleSubsSettings/ViewVehicleSubsSettings',
        element: <ViewVehicleSubsSettings />,
    },
    {
        path: '/SubscriptionModule/VehicleSubsSettings/ViewSpecificVehicleSubsSettings/:settingsId',
        element: <ViewSpecificVehicleSubsSettings />,
    },
    //Subscription History Module
    {
        path: '/subscriptionModule/subscriptionHistory/createSubscriptionHistory',
        element: <CreateSubscriptionHistory />,
    },
    {
        path: '/SubscriptionModule/SubscriptionHistory/EditSubscriptionHistory/:subscriptionHistoryId',
        element: <EditSubscriptionHistory />,
    },
    {
        path: '/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory',
        element: <ViewSubscriptionHistory />,
    },
    {
        path: '/SubscriptionModule/SubscriptionHistory/ViewSpecificSubscriptionHistory/:subscriptionHistoryId',
        element: <ViewSpecificSubscriptionHistory />,
    },
    //Subscription Invoice Module
    {
        path: '/SubscriptionModule/SubscriptionInvoice/CreateSubscriptionInvoice',
        element: <CreateSubscriptionInvoice />,
    },
    {
        path: '/SubscriptionModule/SubscriptionInvoice/EditSubscriptionInvoice/:subscriptionInvoiceId',
        element: <EditSubscriptionInvoice />,
    },
    {
        path: '/SubscriptionModule/SubscriptionInvoice/ViewSubscriptionInvoice',
        element: <ViewSubscriptionInvoice tabs={false} />,
    },
    {
        path: '/SubscriptionModule/SubscriptionInvoice/ViewSpecificSubscriptionInvoice/:subscriptionInvoiceId',
        element: <ViewSpecificSubscriptionInvoice viewSpecific={false} />,
    },

    //OLD TRANSACTION
    //Money Request Module
    // {
    //     path: '/TransactionModule/MoneyRequest/CreateMoneyRequest',
    //     element: <CreateMoneyRequest />,
    // },
    // {
    //     path: '/TransactionModule/MoneyRequest/EditMoneyRequest/:moneyRequestId',
    //     element: <EditMoneyRequest />,
    // },
    // {
    //     path: '/TransactionModule/MoneyRequest/ViewMoneyRequest',
    //     element: <ViewMoneyRequest />,
    // },
    // {
    //     path: '/TransactionModule/MoneyRequest/ViewSpecificMoneyRequest/:moneyRequestId',
    //     element: <ViewSpecificMoneyRequest />,
    // },
    // //Wallet Master Module
    // {
    //     path: '/TransactionModule/WalletMaster/CreateWalletMaster',
    //     element: <CreateWalletMaster />,
    // },
    // {
    //     path: '/TransactionModule/WalletMaster/EditWalletMaster/:walletMasterId',
    //     element: <EditWalletMaster />,
    // },
    // {
    //     path: '/TransactionModule/WalletMaster/ViewWalletMaster',
    //     element: <ViewWalletMaster />,
    // },
    // {
    //     path: '/TransactionModule/WalletMaster/ViewSpecificWalletMaster/:walletMasterId',
    //     element: <ViewSpecificWalletMaster />,
    // },
    // //Wallet History Module
    // {
    //     path: '/transactionModule/walletHistory/createWalletHistory',
    //     element: <CreateWalletHistory />,
    // },
    // {
    //     path: '/TransactionModule/WalletHistory/EditWalletHistory/:walletHistoryId',
    //     element: <EditWalletHistory />,
    // },
    // {
    //     path: '/TransactionModule/WalletHistory/ViewWalletHistory',
    //     element: <ViewWalletHistory tabs={false} />,
    // },
    // {
    //     path: '/TransactionModule/WalletHistory/ViewSpecificWalletHistory/:walletHistoryId',
    //     element: <ViewSpecificWalletHistory />,
    // },
    // //Bank Account Module
    // {
    //     path: '/TransactionModule/BankAccount/CreateBankAccount',
    //     element: <CreateBankAccount />,
    // },
    // {
    //     path: '/TransactionModule/BankAccount/EditBankAccount/:bankAccountId',
    //     element: <EditBankAccount />,
    // },
    // {
    //     path: '/TransactionModule/BankAccount/ViewBankAccount',
    //     element: <ViewBankAccount />,
    // },
    // {
    //     path: '/TransactionModule/BankAccount/ViewSpecificBankAccount/:bankAccountId',
    //     element: <ViewSpecificBankAccount />,
    // },
    // //PG Transactions Module
    // {
    //     path: '/TransactionModule/PGTransactions/CreatePGTransactions',
    //     element: <CreatePGTransactions />,
    // },
    // {
    //     path: '/TransactionModule/PGTransactions/EditPGTransactions/:PGTransactionsId',
    //     element: <EditPGTransactions />,
    // },
    // {
    //     path: '/TransactionModule/PGTransactions/ViewPGTransactions',
    //     element: <ViewPGTransactions tabs={false} />,
    // },
    // {
    //     path: '/TransactionModule/PGTransactions/ViewSpecificPGTransactions/:PGTransactionsId',
    //     element: <ViewSpecificPGTransactions />,
    // },
    // //Application Offered Money Module
    // {
    //     path: '/TransactionModule/AppOfferedMoney/CreateAppOfferedMoney',
    //     element: <CreateAppOfferedMoney />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoney/EditAppOfferedMoney/:appOfferedMoneyId',
    //     element: <EditAppOfferedMoney />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoney/ViewAppOfferedMoney',
    //     element: <ViewAppOfferedMoney />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney/:appOfferedMoneyId',
    //     element: <ViewSpecificAppOfferedMoney />,
    // },
    // //Application Offered Money History Module
    // {
    //     path: '/TransactionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory',
    //     element: <CreateAppOfferedMoneyHistory />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory/:appOfferedMoneyHistoryId',
    //     element: <EditAppOfferedMoneyHistory />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory',
    //     element: <ViewAppOfferedMoneyHistory />,
    // },
    // {
    //     path: '/TransactionModule/AppOfferedMoneyHistory/ViewSpecificAppOfferedMoneyHistory/:appOfferedMoneyHistoryId',
    //     element: <ViewSpecificAppOfferedMoneyHistory />,
    // },

    // -----------NEW TRANSACTION MODULE URL (New name Wallet Module)--------------------------------------------------------------------------------------

    // Add Money Module
    {
        path: 'WalletModule/AddMoneyToWallet/AddMoneyToWalletPage',
        element: <AddMoneyToWallet />,
    },

    {
        path: '/WalletModule/AddMoneyToWallet/ViewAddMoneyToWalletPage',
        element: <ViewAddMoneyToWallet />,
    },

    {
        path: '/WalletModule/AddMoneyToWallet/ViewSpecificAddMoneyToWallet/:AddMoneyToWalletId',
        element: <ViewSpecificAddMoneyToWallet />,
    },

    // Wallet History Module
    {
        path: '/WalletModule/WalletTransactionHistory/ViewWalletHistory',
        element: <ViewWalletHistory tabs={false} />,
    },
    {
        path: '/WalletModule/WalletTransactionHistory/ViewSpecificWalletHistory/:WalletHistoryID',
        element: <ViewSpecificWalletHistory />,
    },

    //new sub modules
    {
        path: '/WalletModule/WalletList/ViewWalletList',
        element: <ViewWalletList />,
    },

    {
        path: '/WalletModule/TransactionHistory/ViewTransactionHistory',
        element: <ViewTransactionHistory />,
    },

    {
        path: '/WalletModule/TransactionHistory/ViewSpecificTransactionHistory/:TransactionHistoryId',
        element: <ViewSpecificTransactionHistory />,
    },

    {
        path: '/WalletModule/TownerCoinsTransaction/ViewTownerCoins',
        element: <ViewTownerCoins />,
    },

    // Bank Account Details Module
    {
        path: '/WalletModule/BankAccountDeatails/ViewBankAccount',
        element: <ViewBankAccount />,
    },

    {
        path: '/WalletModule/BankAccountDetails/CreateBankAccount',
        element: <CreateBankAccount />,
    },

    {
        path: '/WalletModule/BankAccountDetails/ViewSpecificBankAccount/:BankAccountDetailsID',
        element: <ViewSpecificBankAccount />,
    },

    {
        path: '/WalletModule/BankAccountDetails/EditBankAccount/:BankAccountDetailsID',
        element: <EditBankAccount />,
    },

    // PG Transactions Module
    {
        path: '/WalletModule/PGTransactions/CreatePGTransactionsPage',
        element: <CreatePGTransactions />,
    },
    {
        path: '/WalletModule/PGTransactions/EditPGTransactionsPage',
        element: <EditPGTransactions />,
    },
    {
        path: '/WalletModule/PGTransactions/ViewPGTransactionsPage',
        element: <ViewPGTransactions tabs={false} />,
    },
    {
        path: '/WalletModule/PGTransactions/ViewSpecificPGTransactionsPage/:PGTransactionsID',
        element: <ViewSpecificPGTransactions />,
    },

    // Withdraw Money Module
    {
        path: '/WalletModule/WithdrawMoneyFromWallet/ViewWithdrawMoneyFromWallet',
        element: <ViewWithdrawMoneyFromWallet />,
    },
    {
        path: '/WalletModule/WithdrawMoneyFromWallet/WithdrawMoneyFromWallet',
        element: <WithdrawMoneyFromWallet />,
    },

    {
        path: '/WalletModule/WithdrawMoneyFromWallet/ViewSpecificWithdrawMoneyFromWallet/:WithdrawMoneyFromWalletId',
        element: <ViewSpecificWithdrawMoneyFromWallet />,
    },

    // Subscription History Module
    {
        path: '/WalletModule/SubscriptionWalletHistroy/ViewSubscriptionWalletHistroy',
        element: <ViewSubscriptionWalletHistroy />,
    },
    {
        path: '/WalletModule/SubscriptionWalletHistroy/ViewSpecificSubscriptionWalletHistroy/:SubscriptionWalletHistroyID',
        element: <ViewSpecificSubscriptionWalletHistroy />,
    },

    // Trip Transaction Module
    {
        path: '/WalletModule/TripTransaction/ViewTripTransaction',
        element: <ViewTripTransaction tabs={false} />,
    },
    {
        path: '/WalletModule/TripTransaction/ViewSpecificTripTransaction/:TripTransactionID',
        element: <ViewSpecificTripTransaction />,
    },

    // Channel Partner Transaction Module
    {
        path: '/WalletModule/ChannelPartnerTransaction/ViewChannelPartnerTransaction',
        element: <ViewChannelPartnerTransaction tabs={false} />,
    },
    {
        path: '/WalletModule/ChannelPartnerTransaction/ViewSpecificChannelPartnerTransaction/:ChannelPartnerTransactionID',
        element: <ViewSpecificChannelPartnerTransaction />,
    },

    // Distributor Transaction Module
    {
        path: '/WalletModule/DistributorTransaction/ViewDistributorTransaction',
        element: <ViewDistributorTransaction tabs={false} />,
    },
    {
        path: '/WalletModule/DistributorTransaction/ViewSpecificDistributorTransaction/:DistributorTransactionID',
        element: <ViewSpecificDistributorTransaction />,
    },

    // Internal User Transaction Module
    // Send Money
    {
        path: '/WalletModule/InternerUserTransaction/SendMoney/ViewSendMoney',
        element: <ViewSendMoney tabs={false} />,
    },
    {
        path: '/WalletModule/InternerUserTransaction/SendMoney/ViewSpecificSendMoney/:SendMoneyID',
        element: <ViewSpecificSendMoney />,
    },
    // Request Money
    {
        path: '/WalletModule/InternerUserTransaction/RequestMoney/ViewRequestMoney',
        element: <ViewRequestMoney />,
    },
    {
        path: '/WalletModule/InternerUserTransaction/RequestMoney/ViewSpecificRequestMoney/:ReciveMoneyID',
        element: <ViewSpecificRequestMoney />,
    },

    // -------------------------------------------------------------------------------------------------

    //Bonus Master Module
    {
        path: '/PromotionModule/BonusMaster/CreateBonusMaster',
        element: <CreateBonusMaster />,
    },
    {
        path: '/PromotionModule/BonusMaster/EditBonusMaster/:bonusMasterId',
        element: <EditBonusMaster />,
    },
    {
        path: '/PromotionModule/BonusMaster/ViewBonusMaster',
        element: <ViewBonusMaster tabs={true} />,
    },
    {
        path: '/PromotionModule/BonusMaster/ViewSpecificBonusMaster/:bonusMasterId',
        element: <ViewSpecificBonusMaster />,
    },
    //Bonus History Module
    {
        path: '/promotionModule/bonusHistory/createBonusHistory',
        element: <CreateBonusHistory />,
    },
    {
        path: '/PromotionModule/BonusHistory/EditBonusHistory/:bonusHistoryId',
        element: <EditBonusHistory />,
    },
    {
        path: '/PromotionModule/BonusHistory/ViewBonusHistory',
        element: <ViewBonusHistory tabs={false} />,
    },
    {
        path: '/PromotionModule/BonusHistory/ViewSpecificBonusHistory/:bonusHistoryId',
        element: <ViewSpecificBonusHistory />,
    },
    //Coupon Master Module
    {
        path: '/PromotionModule/CouponMaster/CreateCouponMaster',
        element: <CreateCouponMaster />,
    },
    {
        path: '/PromotionModule/CouponMaster/EditCouponMaster/:couponMasterId',
        element: <EditCouponMaster />,
    },
    {
        path: '/PromotionModule/CouponMaster/ViewCouponMaster',
        element: <ViewCouponMaster tabs={true} />,
    },
    {
        path: '/PromotionModule/CouponMaster/ViewSpecificCouponMaster/:couponMasterId',
        element: <ViewSpecificCouponMaster />,
    },
    //Coupon History Module
    {
        path: '/PromotionModule/CouponHistory/CreateCouponHistory',
        element: <CreateCouponHistory />,
    },
    {
        path: '/PromotionModule/CouponHistory/EditCouponHistory/:couponHistoryId',
        element: <EditCouponHistory />,
    },
    {
        path: '/PromotionModule/CouponHistory/ViewCouponHistory',
        element: <ViewCouponHistory tabs={false} />,
    },
    {
        path: '/PromotionModule/CouponHistory/ViewSpecificCouponHistory/:couponHistoryId',
        element: <ViewSpecificCouponHistory />,
    },
    //Refferal Master Module
    {
        path: '/PromotionModule/RefferalMaster/CreateRefferalMaster',
        element: <CreateRefferalMaster />,
    },
    {
        path: '/PromotionModule/RefferalMaster/EditRefferalMaster/:refferalMasterId',
        element: <EditRefferalMaster />,
    },
    {
        path: '/PromotionModule/RefferalMaster/ViewRefferalMaster',
        element: <ViewRefferalMaster tabs={false} />,
    },
    {
        path: '/PromotionModule/RefferalMaster/ViewSpecificRefferalMaster/:refferalMasterId',
        element: <ViewSpecificRefferalMaster />,
    },
    //Refferal History Module
    {
        path: '/PromotionModule/RefferalHistory/CreateRefferalHistory',
        element: <CreateRefferalHistory />,
    },
    {
        path: '/PromotionModule/RefferalHistory/EditRefferalHistory/:refferalHistoryId',
        element: <EditRefferalHistory />,
    },
    {
        path: '/PromotionModule/RefferalHistory/ViewRefferalHistory',
        element: <ViewRefferalHistory tabs={false} />,
    },
    {
        path: '/promotionModule/refferalHistory/viewSpecificRefferalHistory/:refferalHistoryId',
        element: <ViewSpecificRefferalHistory />,
    },
    //Promocode Master Module
    {
        path: '/PromotionModule/PromocodeMaster/CreatePromocodeMaster',
        element: <CreatePromocodeMaster />,
    },
    {
        path: '/PromotionModule/PromocodeMaster/EditPromocodeMaster/:promocodeMasterId',
        element: <EditPromocodeMaster />,
    },
    {
        path: '/PromotionModule/PromocodeMaster/ViewPromocodeMaster',
        element: <ViewPromocodeMaster tabs={true} />,
    },
    {
        path: '/PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster/:promocodeMasterId',
        element: <ViewSpecificPromocodeMaster />,
    },
    //Promocode History Module
    {
        path: '/promotionModule/promocodeHistory/createPromocodeHistory',
        element: <CreatePromocodeHistory />,
    },
    {
        path: '/PromotionModule/PromocodeHistory/EditPromocodeHistory/:promocodeHistoryId',
        element: <EditPromocodeHistory />,
    },
    {
        path: '/PromotionModule/PromocodeHistory/ViewPromocodeHistory',
        element: <ViewPromocodeHistory tabs={false} />,
    },
    {
        path: '/PromotionModule/PromocodeHistory/ViewSpecificPromocodeHistory/:promocodeHistoryId',
        element: <ViewSpecificPromocodeHistory />,
    },

    //wallet history
    {
        path: '/PromotionModule/WalletHistory/ViewWalletHistoryPage',
        element: <ViewWalletHistoryPage tabs={false} />,
    },
    {
        path: '/PromotionModule/WalletHistory/ViewSpecificWalletHistroy/:WalletHostoryID',
        element: <ViewSpecificWalletHistroy />,
    },

    //Application Offered Money Module
    {
        path: '/PromotionModule/AppOfferedMoney/CreateAppOfferedMoney',
        element: <CreateAppOfferedMoney />,
    },
    {
        path: '/PromotionModule/AppOfferedMoney/EditAppOfferedMoney/:AppOfferedMoneyID',
        element: <EditAppOfferedMoney />,
    },
    {
        path: '/PromotionModule/AppOfferedMoney/ViewAppOfferedMoney',
        element: <ViewAppOfferedMoney />,
    },
    {
        path: '/PromotionModule/AppOfferedMoney/ViewSpecificAppOfferedMoney/:AppOfferedMoneyID',
        element: <ViewSpecificAppOfferedMoney />,
    },
    //Application Offered Money History Module
    {
        path: '/PromotionModule/AppOfferedMoneyHistory/CreateAppOfferedMoneyHistory',
        element: <CreateAppOfferedMoneyHistory />,
    },
    {
        path: '/PromotionModule/AppOfferedMoneyHistory/EditAppOfferedMoneyHistory/:AppOfferedMoneyHistoryID',
        element: <EditAppOfferedMoneyHistory />,
    },
    {
        path: '/PromotionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory',
        element: <ViewAppOfferedMoneyHistory />,
    },
    {
        path: '/PromotionModule/AppOfferedMoneyHistory/ViewSpecificAppOfferedMoneyHistory/:AppOfferedMoneyHistoryID',
        element: <ViewSpecificAppOfferedMoneyHistory />,
    },

    //Vehicle Type (Trip) Module--Remove the files
    // {
    //     path: '/TripModule/VehicleTypes/CreateVehicleTypes',
    //     element: <CreateVehicleTypes />,
    // },
    // {
    //     path: '/TripModule/VehicleTypes/EditVehicleTypes/:vehicleTypesId',
    //     element: <EditVehicleTypes />,
    // },
    // {
    //     path: '/TripModule/VehicleTypes/ViewVehicleTypes',
    //     element: <ViewVehicleTypes />,
    // },
    // {
    //     path: '/TripModule/TripSettings/VehicleType/ViewSpecificVehicleTypes/:vehicleTypesId',
    //     element: <ViewSpecificVehicleTypes />,
    // },
    //Vehicle Fare Master Module
    {
        path: '/TripModule/VehicleFareMaster/CreateVehicleFareMaster',
        element: <CreateVehicleFareMaster />,
    },
    {
        path: '/TripModule/VehicleFareMaster/EditVehicleFareMaster/:vehicleFareMasterId',
        element: <EditVehicleFareMaster />,
    },
    {
        path: '/TripModule/VehicleFareMaster/ViewVehicleFareMaster',
        element: <ViewVehicleFareMaster />,
    },
    {
        path: '/TripModule/VehicleFareMaster/ViewSpecificVehicleFareMaster/:vehicleFareMasterId',
        element: <ViewSpecificVehicleFareMaster />,
    },
    //Bookings Module
    {
        path: '/TripModule/Bookings/CreateBookings',
        element: <CreateBookings />,
    },
    {
        path: '/TripModule/Bookings/EditBookings/:bookingsId',
        element: <EditBookings />,
    },
    {
        path: '/TripModule/Bookings/ViewBookings',
        element: <ViewBookings tabs={false} />,
    },
    {
        path: '/TripModule/Bookings/ViewSpecificBookings/:bookingsId',
        element: <ViewSpecificBookings />,
    },
    //Trips Module
    {
        path: '/TripModule/Trips/CreateTrips',
        element: <CreateTrips />,
    },
    {
        path: '/TripModule/Trips/EditTrips/:tripsId',
        element: <EditTrips />,
    },
    {
        path: '/TripModule/Trips/ViewTrips',
        element: <ViewTrips />,
    },
    {
        path: '/TripModule/Trips/ViewSpecificTrips/:tripsId',
        element: <ViewSpecificTrips />,
    },
    //Booking Amount Distribution Module
    {
        path: '/TripModule/BookingAmtDistribution/CreateBookingAmtDistribution',
        element: <CreateBookingAmtDistribution />,
    },
    {
        path: '/TripModule/BookingAmtDistribution/EditBookingAmtDistribution/:bookingAmtDistributionId',
        element: <EditBookingAmtDistribution />,
    },
    {
        path: '/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution',
        element: <ViewBookingAmtDistribution />,
    },
    {
        path: '/TripModule/BookingAmtDistribution/ViewSpecificBookingAmtDistribution/:bookingAmtDistributionId',
        element: <ViewSpecificBookingAmtDistribution />,
    },
    //Tickets Module
    {
        path: '/TripModule/Tickets/CreateTickets',
        element: <CreateTickets />,
    },
    {
        path: '/TripModule/Tickets/EditTickets/:ticketsId',
        element: <EditTickets />,
    },
    {
        path: '/TripModule/Tickets/ViewTickets',
        element: <ViewTickets tabs={false} />,
    },
    {
        path: '/TripModule/Tickets/ViewSpecificTickets/:ticketsId',
        element: <ViewSpecificTickets />,
    },
    //Trips Invoice Module
    {
        path: '/TripModule/TripsInvoice/CreateTripsInvoice',
        element: <CreateTripsInvoice />,
    },
    {
        path: '/TripModule/TripsInvoice/EditTripsInvoice/:tripsInvoiceId',
        element: <EditTripsInvoice />,
    },
    {
        path: '/TripModule/TripsInvoice/ViewTripsInvoice',
        element: <ViewTripsInvoice tabs={false} />,
    },
    {
        path: '/TripModule/TripsInvoice/ViewSpecificTripsInvoice/:tripsInvoiceId',
        element: <ViewSpecificTripsInvoice />,
    },

    //Riders Module---Remove the files now not  needed

    // {
    //     path: '/RiderModule/RiderUsers/ViewRiderUsers',
    //     element: <ViewRiderUsers tabs={''} />,
    // },

    // {
    //     path: '/RiderModule/RiderUsers/CreateRiderUsers',
    //     element: <CreateRiderUsers />,
    // },
    // {
    //     path: '/RiderModule/RiderUsers/EditRiderUsers/:RiderUserId',
    //     element: <EditRiderUsers />,
    // },

    // {
    //     path: '/RiderModule/RiderUsers/ViewSpecificRiderUsers/:RiderUsersId',
    //     element: <ViewSpecificRiderUsers />,
    // },

    //Settings Panel (Settings) Module
    {
        path: '/SettingsModule/SettingsPanel/CreateSettingsPanel',
        element: <CreateSettingsPanel />,
    },
    {
        path: '/SettingsModule/SettingsPanel/EditSettingsPanel/:settingsPanelId',
        element: <EditSettingsPanel />,
    },
    {
        path: '/SettingsModule/SettingsPanel/ViewSettingsPanel',
        element: <ViewSettingsPanel />,
    },
    {
        path: '/SettingsModule/SettingsPanel/ViewSpecificSettingsPanel/:settingsPanelId',
        element: <ViewSpecificSettingsPanel />,
    },
    {
        path: '/SettingsModule/EmailTemplate/CreateEmailTemplate',
        element: <CreateEmailTemplate />,
    },
    {
        path: '/SettingsModule/EmailTemplate/ViewEmailTemplate',
        element: <ViewEmailTemplate />,
    },
    {
        path: '/SettingsModule/EmailTemplate/EditEmailTemplate/:EmailTemplateId',
        element: <EditEmailTemplate />,
    },
    {
        path: '/SettingsModule/EmailTemplate/ViewSpecificEmailTemplate/:EmailTemplateId',
        element: <ViewSpecificEmailTemplate />,
    },
    {
        path: '/SettingsModule/ReferralSettings/ViewReferralSettings',
        element: <ViewReferralSettings />,
    },

    // google settings

    // map
    {
        path: '/SettingsModule/Google/Map/ViewMap',
        element: <ViewMap />,
    },

    // firebase
    {
        path: '/SettingsModule/Google/FireBase/ViewFireBase',
        element: <ViewFireBase />,
    },

    // azure settings

    // cloud
    {
        path: '/SettingsModule/Azure/Cloud/ViewCloud',
        element: <ViewCloud />,
    },

    // doc verification
    {
        path: '/SettingsModule/Azure/DocVerification/ViewDocVerification',
        element: <ViewDocVerification />,
    },

    // pg settings

    // view collect
    {
        path: '/SettingsModule/PaymentGateway/Collect/ViewCollect',
        element: <ViewCollect />,
    },

    // payout
    {
        path: '/SettingsModule/PaymentGateway/PayOut/ViewPayOut',
        element: <ViewPayOut />,
    },

    // third party settings

    // document
    {
        path: '/SettingsModule/ThirdParty/Document/ViewDocument',
        element: <ViewDocument />,
    },

    //Country (Utility) Module
    {
        path: '/UtilityModule/Country/CreateCountry',
        element: <CreateCountry />,
    },
    {
        path: '/UtilityModule/Country/EditCountry/:countryId',
        element: <EditCountry />,
    },
    {
        path: '/UtilityModule/Country/ViewCountry',
        element: <ViewCountry />,
    },
    {
        path: '/UtilityModule/Country/ViewSpecificCountry/:countryId',
        element: <ViewSpecificCountry />,
    },
    //State (Utility) Module
    {
        path: '/UtilityModule/State/CreateState',
        element: <CreateState />,
    },
    {
        path: '/UtilityModule/State/EditState/:stateId',
        element: <EditState />,
    },
    {
        path: '/UtilityModule/State/ViewState',
        element: <ViewState />,
    },
    {
        path: '/UtilityModule/State/ViewSpecificState/:stateId',
        element: <ViewSpecificState />,
    },
    //City (Utility) Module
    {
        path: '/UtilityModule/City/CreateCity',
        element: <CreateCity />,
    },
    {
        path: '/UtilityModule/City/EditCity/:cityId',
        element: <EditCity />,
    },
    {
        path: '/UtilityModule/City/ViewCity',
        element: <ViewCity />,
    },
    {
        path: '/UtilityModule/City/ViewSpecificCity/:cityId',
        element: <ViewSpecificCity />,
    },
    //Service City (Utility) Module
    // {
    //     path: '/UtilityModule/ServiceCity/CreateServiceCity',
    //     element: <CreateServiceCity />,
    // },
    // {
    //     path: '/UtilityModule/ServiceCity/EditServiceCity/:serviceCityId',
    //     element: <EditServiceCity />,
    // },
    // {
    //     path: '/UtilityModule/ServiceCity/ViewServiceCity',
    //     element: <ViewServiceCity />,
    // },
    // {
    //     path: '/UtilityModule/ServiceCity/ViewSpecificServiceCity/:serviceCityId',
    //     element: <ViewSpecificServiceCity />,
    // },
    //Status (Utility) Module
    {
        path: '/UtilityModule/Status/CreateStatus',
        element: <CreateStatus />,
    },
    {
        path: '/UtilityModule/Status/EditStatus/:statusId',
        element: <EditStatus />,
    },
    {
        path: '/UtilityModule/Status/ViewStatus',
        element: <ViewStatus />,
    },
    {
        path: '/UtilityModule/Status/ViewSpecificStatus/:statusId',
        element: <ViewSpecificStatus />,
    },
    //TicketType (Utility) Module
    {
        path: '/UtilityModule/TicketType/CreateTicketType',
        element: <CreateTicketType />,
    },
    {
        path: '/UtilityModule/TicketType/EditTicketType/:ticketTypeId',
        element: <EditTicketType />,
    },
    {
        path: '/UtilityModule/TicketType/ViewTicketType',
        element: <ViewTicketType />,
    },
    {
        path: '/UtilityModule/TicketType/ViewSpecificTicketType/:ticketTypeId',
        element: <ViewSpecificTicketType />,
    },
    //AdminRole (Utility) Module
    {
        path: '/UtilityModule/AdminRole/CreateAdminRole',
        element: <CreateAdminRole />,
    },
    {
        path: '/UtilityModule/AdminRole/EditAdminRole/:adminRoleId',
        element: <EditAdminRole />,
    },
    {
        path: '/UtilityModule/AdminRole/ViewAdminRole',
        element: <ViewAdminRole />,
    },
    {
        path: '/UtilityModule/AdminRole/ViewSpecificAdminRole/:adminRoleId',
        element: <ViewSpecificAdminRole />,
    },
    //ModuleMaster (Utility) Module
    {
        path: '/UtilityModule/ModuleMaster/CreateModuleMaster',
        element: <CreateModuleMaster />,
    },
    {
        path: '/UtilityModule/ModuleMaster/EditModuleMaster/:moduleMasterId',
        element: <EditModuleMaster />,
    },
    {
        path: '/UtilityModule/ModuleMaster/ViewModuleMaster',
        element: <ViewModuleMaster />,
    },
    {
        path: '/UtilityModule/ModuleMaster/ViewSpecificModuleMaster/:moduleMasterId',
        element: <ViewSpecificModuleMaster />,
    },
    //DocumentType (Utility) Module
    {
        path: '/UtilityModule/DocumentType/CreateDocumentType',
        element: <CreateDocumentType />,
    },
    {
        path: '/UtilityModule/DocumentType/EditDocumentType/:documentTypeId',
        element: <EditDocumentType />,
    },
    {
        path: '/UtilityModule/DocumentType/ViewDocumentType',
        element: <ViewDocumentType />,
    },
    {
        path: '/UtilityModule/DocumentType/ViewSpecificDocumentType/:documentTypeId',
        element: <ViewSpecificDocumentType />,
    },
    //ChannelPartnerType (Utility) Module
    {
        path: '/UtilityModule/ChannelPartnerType/CreateChannelPartnerType',
        element: <CreateChannelPartnerType />,
    },
    {
        path: '/UtilityModule/ChannelPartnerType/EditChannelPartnerType/:channelPartnerTypeId',
        element: <EditChannelPartnerType />,
    },
    {
        path: '/UtilityModule/ChannelPartnerType/ViewChannelPartnerType',
        element: <ViewChannelPartnerType />,
    },
    {
        path: '/UtilityModule/ChannelPartnerType/ViewSpecificChannelPartnerType/:channelPartnerTypeId',
        element: <ViewSpecificChannelPartnerType />,
    },
    //EmployeeLevel (Utility) Module
    {
        path: '/UtilityModule/EmployeeLevel/CreateEmployeeLevel',
        element: <CreateEmployeeLevel />,
    },
    {
        path: '/UtilityModule/EmployeeLevel/EditEmployeeLevel/:employeeLevelId',
        element: <EditEmployeeLevel />,
    },
    {
        path: '/UtilityModule/EmployeeLevel/ViewEmployeeLevel',
        element: <ViewEmployeeLevel />,
    },
    {
        path: '/UtilityModule/EmployeeLevel/ViewSpecificEmployeeLevel/:employeeLevelId',
        element: <ViewSpecificEmployeeLevel />,
    },
    //CompanyType (Utility) Module
    {
        path: '/UtilityModule/CompanyType/CreateCompanyType',
        element: <CreateCompanyType />,
    },
    {
        path: '/UtilityModule/CompanyType/EditCompanyType/:companyTypeId',
        element: <EditCompanyType />,
    },
    {
        path: '/UtilityModule/CompanyType/ViewCompanyType',
        element: <ViewCompanyType />,
    },
    {
        path: '/UtilityModule/CompanyType/ViewSpecificCompanyType/:companyTypeId',
        element: <ViewSpecificCompanyType />,
    },
    //VehicleUtility (Utility) Module
    {
        path: '/UtilityModule/VehicleUtility/CreateVehicleUtility',
        element: <CreateVehicleUtility />,
    },
    {
        path: '/UtilityModule/VehicleUtility/EditVehicleUtility/:vehicleUtilityId',
        element: <EditVehicleUtility />,
    },
    {
        path: '/UtilityModule/VehicleUtility/ViewVehicleUtility',
        element: <ViewVehicleUtility />,
    },
    {
        path: '/UtilityModule/VehicleUtility/ViewSpecificVehicleUtility/:vehicleUtilityId',
        element: <ViewSpecificVehicleUtility />,
    },

    //App Laguage (Utility) Module
    {
        path: '/UtilityModule/AppLaguage/ViewAppLaguage',
        element: <ViewAppLaguage />,
    },
    {
        path: '/utilityModule/AppLaguage/CreateAppLanguage',
        element: <CreateAppLanguage />,
    },
    {
        path: '/utilityModule/AppLaguage/ViewSpecificAppLan/:appLanId',
        element: <ViewSpecificAppLan />,
    },
    {
        path: '/UtilityModule/AppLaguage/EditAppLan/:appLanId',
        element: <EditAppLan />,
    },

    //Cancellation Reasons (Utility) Module
    {
        path: '/UtilityModule/CancellationReasons/ViewCancellationReasons',
        element: <ViewCancellationReasons />,
    },
    {
        path: '/UtilityModule/CancellationReasons/CreateCancellationReason',
        element: <CreateCancellationReason />,
    },
    {
        path: '/UtilityModule/CancellationReasons/EditCancellation/:cancellationReasonId',
        element: <EditCancellation />,
    },
    {
        path: '/UtilityModule/CancellationReasons/ViewSpecificCancellation/:cancellationReasonId',
        element: <ViewSpecificCancellation />,
    },

    //Feedback Reasons (Utility) Module
    {
        path: '/UtilityModule/FeedbackReasons/ViewFeedbackReasons',
        element: <ViewFeedbackReasons />,
    },
    {
        path: '/UtilityModule/FeedbackReasons/CreateFeedBackReason',
        element: <CreateFeedBackReason />,
    },
    {
        path: '/UtilityModule/FeedbackReasons/EditFeedbackReason/:feedbackReasonId',
        element: <EditFeedbackReason />,
    },
    {
        path: '/UtilityModule/FeedbackReasons/ViewSpecificFeedbackReason/:feedbackReasonId',
        element: <ViewSpecificFeedbackReason />,
    },

    //ViewCurrency Management (Utility) Module
    {
        path: '/UtilityModule/CurrencyManagement/ViewCurrencyManagement',
        element: <ViewCurrencyManagement />,
    },
    {
        path: '/utilityModule/CurrencyManagement/CreateCurrencyData',
        element: <CreateCurrencyData />,
    },
    {
        path: '/UtilityModule/CurrencyManagement/ViewSpecificCurrency/:currencyId',
        element: <ViewSpecificCurrency />,
    },
    {
        path: '/UtilityModule/CurrencyManagement/EditCurrency/:currencyId',
        element: <EditCurrency />,
    },

    //View Office details (Utility) Module
    {
        path: '/UtilityModule/OfficeDetails/ViewOfficeDetails',
        element: <ViewOfficeDetails />,
    },
    {
        path: '/UtilityModule/OfficeDetails/CreateOfficeDetails',
        element: <CreateOfficeDetails />,
    },

    {
        path: '/UtilityModule/OfficeDetails/ViewSpecificOfficeDetails/:officeId',
        element: <ViewSpecificOfficeDetails />,
    },
    {
        path: '/UtilityModule/OfficeDetails/EditOfficeDetails/:officeId',
        element: <EditOfficeDetails />,
    },

    //View Vehicle Color(Utility) Module

    {
        path: '/UtilityModule/VehicleColor/CreateVehicleColor',
        element: <CreateVehicleColor />,
    },

    {
        path: '/UtilityModule/VehicleColor/ViewVehicleColor',
        element: <ViewVehicleColor />,
    },

    {
        path: '/UtilityModule/VehicleColor/ViewSpecificVehicleColor/:VehicleColorId',
        element: <ViewSpecificVehicleColor />,
    },

    {
        path: '/UtilityModule/VehicleColor/EditVehicleColor/:VehicleColorId',
        element: <EditVehicleColor />,
    },

    //View Vehicle Fuel(Utility) Module
    {
        path: '/UtilityModule/VehicleFuel/ViewVehicleFuel',
        element: <ViewVehicleFuel />,
    },

    {
        path: '/UtilityModule/VehicleFuel/CreateVehicleFuel',
        element: <CreateVehicleFuel />,
    },

    {
        path: '/UtilityModule/VehicleFuel/ViewSpecificVehicleFuel/:VehicleFuelid',
        element: <ViewSpecificVehicleFuel />,
    },

    {
        path: '/UtilityModule/VehicleFuel/EditVehicleFuel/:VehicleFuelid',
        element: <EditVehicleFuel />,
    },

    //View Priority details (Utility) Module
    {
        path: '/UtilityModule/Priority/ViewPriority',
        element: <ViewPriority />,
    },
    {
        path: '/UtilityModule/Priority/CreatePriority',
        element: <CreatePriority />,
    },

    {
        path: '/UtilityModule/Priority/ViewSpecificPriority/:PriorityId',
        element: <ViewSpecificPriority />,
    },

    {
        path: '/UtilityModule/Priority/EditPriority/:PriorityId',
        element: <EditPriority />,
    },

    //distributor role type

    {
        path: '/UtilityModule/DistributorRoleType/CreateDistributorRoleType',
        element: <CreateDistributorRoleType />,
    },
    {
        path: '/UtilityModule/DistributorRoleType/ViewDistributorRoleType',
        element: <ViewDistributorRoleType />,
    },
    {
        path: '/UtilityModule/DistributorRoleType/ViewSpecificDistributorRoleType/:distributorRoleId',
        element: <ViewSpecificDistributorRoleType />,
    },
    {
        path: '/UtilityModule/DistributorRoleType/EditDistributorRoleType/:distributorRoleId',
        element: <EditDistributorRoleType />,
    },

    //General Settings (Server Config) Module
    {
        path: '/ServerConfigModule/GeneralSettings/ViewGeneralSettings',
        element: <ViewGeneralSettings />,
    },

    //Firebase Settings (Server Config) Module
    {
        path: '/ServerConfigModule/FirebaseSettings/ViewFirebaseSettings',
        element: <ViewFirebaseSettings />,
    },

    //Email Configurations (Server Config) Module
    {
        path: '/ServerConfigModule/EmailConfigurations/ViewEmailConfigurations',
        element: <ViewEmailConfigurations />,
    },

    //SMS Configurations (Server Config) Module
    {
        path: '/ServerConfigModule/SMSConfigurations/ViewSMSConfigurations',
        element: <ViewSMSConfigurations />,
    },

    //PG Configurations (Server Config) Module
    {
        path: '/ServerConfigModule/PaymentGatewayConfigurations/ViewPaymentGatewayConfigurations',
        element: <ViewPaymentGatewayConfigurations />,
    },
    //Rentails TnC (Pages Module) Module
    {
        path: '/PagesModule/RentailsTnC/ViewRentailsTnC',
        element: <ViewRentailsTnC />,
    },
    {
        path: '/PagesModule/RentailsTnC/editRentailsTnC',
        element: <EditRentailsTnC />,
    },
    //Outstations Tnc (Pages Module) Module
    {
        path: '/PagesModule/OutstationsTnc/ViewOutstationsTnc',
        element: <ViewOutstationsTnc />,
    },
    {
        path: '/PagesModule/OutstationsTnc/editOutstationsTnc',
        element: <EditOutstationsTnc />,
    },

    {
        path: '/ResetPassword',
        element: <AuthHOC roles={['ADMIN']}>{<PasswordReset />}</AuthHOC>,
    },
    {
        path: '/CancellationSettings',
        element: <AuthHOC roles={['ADMIN']}>{<CancellationSettings />}</AuthHOC>,
    },

    //Not needed
    // {
    //     path: '/Demographics',
    //     element: <AuthHOC roles={['ADMIN']}>{<Demographics />}</AuthHOC>,
    // },
    // {
    //     path: '/RentalPackage',
    //     element: <AuthHOC roles={['ADMIN']}>{<RentalPackage />}</AuthHOC>,
    // },
    // {
    //     path: '/OutstationPackage',
    //     element: <AuthHOC roles={['ADMIN']}>{<OutstationPackage />}</AuthHOC>,
    // },
    // {
    //     path: '/HailTrip',
    //     element: <AuthHOC roles={['ADMIN']}>{<HailTrip />}</AuthHOC>,
    // },
    // {
    //     path: '/MapViewModule/HeatMap/ViewHeatMap',
    //     element: <AuthHOC roles={['ADMIN']}>{<ViewHeatMap />}</AuthHOC>,
    // },
    //View Gods View (Map View Config) Module.
    // {
    //     path: '/MapViewModule/GodsView/ViewGodsView',
    //     element: (
    //         <AuthHOC roles={['ADMIN']}>
    //             <ViewGodsView />
    //         </AuthHOC>
    //     ),
    // },
    // //view Drivers Tracking (Map View Config) Module.
    // {
    //     path: '/MapViewModule/DriversTracking/ViewDriversTracking',
    //     element: (
    //         <AuthHOC roles={['ADMIN']}>
    //             <ViewDriversTracking />
    //         </AuthHOC>
    //     ),
    // },
    //view Driver Tracking (Ratings Review Module Config) Module.
    // {
    //     path: '/RatingsReviewModule/Driver/viewDriver',
    //     element: (
    //         <AuthHOC roles={['ADMIN']}>
    //             <ViewDriver />
    //         </AuthHOC>
    //     ),
    // },
    //view Driver Tracking (Ratings Review Module Config) Module.
    // {
    //     path: '/RatingsReviewModule/Rider/viewRider',
    //     element: (
    //         <AuthHOC roles={['ADMIN']}>
    //             <ViewRider />
    //         </AuthHOC>
    //     ),
    // },
    //View Colors (APP CMS) Module.
    {
        path: '/APPCMSModule/Colors/ViewColors',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewColors />
            </AuthHOC>
        ),
    },
    //view Years (APP CMS) Module.
    {
        path: '/APPCMSModule/Years/ViewYears',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewYears />
            </AuthHOC>
        ),
    },
    //view About Us (APP CMS) Module.
    {
        path: '/APPCMSModule/AboutUs/ViewAboutUs',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewAboutUs />
            </AuthHOC>
        ),
    },
    //view Rider Privacy (APP CMS) Module.
    {
        path: '/APPCMSModule/RiderPrivacy/ViewRiderPrivacy',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewRiderPrivacy />
            </AuthHOC>
        ),
    },
    //view Rider Terms And Conditions (APP CMS) Module.
    {
        path: '/APPCMSModule/RiderTermsAndConditions/ViewRiderTermsAndConditions',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewRiderTermsAndConditions />
            </AuthHOC>
        ),
    },
    //view Driver Termsand Conditions (APP CMS) Module.
    {
        path: '/APPCMSModule/DriverTermsandConditions/ViewDriverTermsandConditions',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewDriverTermsandConditions />
            </AuthHOC>
        ),
    },
    //view Email (Send Notifications Module) Module.
    {
        path: '/SendNotificationsModule/Email/ViewEmail',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewEmail />
            </AuthHOC>
        ),
    },
    //View Notification (Send Notifications Module) Module.
    {
        path: '/SendNotificationsModule/Notification/ViewNotification',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewNotification />
            </AuthHOC>
        ),
    },

    // view TripPayments (Reports) Module.
    {
        path: '/ReportsModule/TripPayments/ViewTripPayments',
        element: <ViewTripPayments />,
    },

    {
        path: '/ReportsModule/TripPayments/ViewSpecificTripPayments/:TripPaymentsId',
        element: <ViewSpecificTripPayments />,
    },

    //view Driver Duty Report (Reports) Module.
    {
        path: '/ReportsModule/DriverDutyReport/ViewDriverDutyReport',
        element: <ViewDriverDutyReport />,
    },

    {
        path: '/ReportsModule/DriverDutyReport/ViewSpecificDriverDutyReport/:DriverDutyReportId',
        element: <ViewSpecificDriverDutyReport />,
    },

    // View Trip Promo Discounts (Reports) Module.
    {
        path: '/ReportsModule/TripPromoDiscounts/ViewTripPromoDiscounts',
        element: <ViewTripPromoDiscounts />,
    },

    {
        path: '/ReportsModule/TripPromoDiscounts/ViewSpecificTripPromoDiscounts/:TripPromoDiscountsId',
        element: <ViewSpecificTripPromoDiscounts />,
    },

    // view Driver Payments (Reports) Module.
    {
        path: '/ReportsModule/DriverPayments/ViewDriverPayments',
        element: <ViewDriverPayments />,
    },

    {
        path: '/ReportsModule/DriverPayments/ViewSpecificDriverPayments/:DriverDutyReportId',
        element: <ViewSpecificDriverPayments />,
    },

    {
        // Total Trips Report Module
        path: '/ReportsModule/TotalTrip/TotalTrip',
        element: <TotalTrips />,
    },
    {
        // Total Cancelled Trips Report Module
        path: '/ReportsModule/TotalCancelledTrips/TotalCancelledTrips',
        element: <TotalCancelledTrips />,
    },
    {
        // Total Scheduled Trips Report Module
        path: '/ReportsModule/TotalScheduledTrips/TotalScheduledTrips',
        element: <TotalScheduledTrips />,
    },
    {
        // Total Kilometers Travelled Report Module
        path: '/ReportsModule/TotalKmsTraveled/TotalKmsTraveled',
        element: <TotalKmsTravelled />,
    },
    {
        // Total Trip Amount Report Module
        path: '/ReportsModule/TotalTripAmount/TotalTripAmount',
        element: <TotalTripAmount />,
    },
    {
        // Total AI Recognitions Report Module
        path: '/ReportsModule/TotalAiRecognitions/TotalAiRecognitions',
        element: <TotalAlRecognitions />,
    },
    {
        // Total Driver Earned Report Module
        path: '/ReportsModule/TotalDriverEarned/TotalDriverEarned',
        element: <TotalDriverEarned />,
    },
    {
        // Total Days with Towner Report Module
        path: '/ReportsModule/TotalDaysWithTowner/TotalDaysWithTowner',
        element: <TotalDaysWithTowner />,
    },
    {
        // Total Wallet Added Amount Report Module
        path: '/ReportsModule/TotalWalletAddedAmount/TotalWalletAddedAmount',
        element: <TotalWalletAddedAmount />,
    },
    {
        // Total Coupons Claimed Report Module
        path: '/ReportsModule/TotalCouponClaimed/TotalCouponClaimed',
        element: <TotalCouponsClaimed tabs={false} />,
    },
    {
        // Total Wallet Bonus Received Report Module
        path: '/ReportsModule/TotalWalletBonusRecived/TotalWalletBonusRecived',
        element: <TotalWalletBonusReceived />,
    },
    {
        // Total Subscription Report Module
        path: '/ReportsModule/TotalSubscription/TotalSubscription',
        element: <TotalSubscription />,
    },
    {
        // Total Ratings Given Report Module
        path: '/ReportsModule/TotalRatingsGivenByHim/TotalRatingsGivenByHim',
        element: <TotalRatingsGiven />,
    },
    {
        // Total Ratings Received Report Module
        path: '/ReportsModule/TotalRatingRecived/TotalRatingRecived',
        element: <TotalRatingsReceived />,
    },
    {
        // Total Referral Bonus Report Module
        path: '/ReportsModule/TotalRefferalBonus/TotalRefferalBonus',
        element: <TotalReferralBonus tabs={false} />,
    },
    {
        // Total Friends Invited Report Module
        path: '/ReportsModule/TotalFriendsInvitedTrips/TotalFriendsInvitedTrips',
        element: <TotalFriendsInvited />,
    },
    {
        // Total Tickets Raised Report Module
        path: '/ReportsModule/TotalTicketsRised/TotalTicketsRised',
        element: <TotalTicketsRaised />,
    },
    {
        // Discounts Given Report Module
        path: '/ReportsModule/DiscountsGiven/DiscountsGiven',
        element: <DiscountsGiven />,
    },
    {
        // Total Working Hours Report Module
        path: '/ReportsModule/TotalWorkingHours/TotalWorkingHours',
        element: <TotalWorkingHours />,
    },
    {
        // Total Password Reset Report Module
        path: '/ReportsModule/TotalPasswordReset/TotalPasswordReset',
        element: <TotalPasswordReset />,
    },
    {
        // Total Expense Report Module
        path: '/ReportsModule/TotalExpence/TotalExpence',
        element: <TotalExpense />,
    },
    {
        // Total Profile Registered Report Module
        path: '/ReportsModule/TotalProfileRegistered/TotalProfileRegistered',
        element: <TotalProfileRegistered />,
    },
    {
        // Total Wallet Pay Received Report Module
        path: '/ReportsModule/TotalCountOfWalletPayRecived/TotalCountOfWalletPayRecived',
        element: <TotalCountOfWalletPayRecived />,
    },
    {
        // Total Wallet Pay Received Report Module
        path: '/ReportsModule/TotalCountOfWalletPaySent/TotalCountOfWalletPaySent',
        element: <TotalCountOfWalletPaySent />,
    },

    //User management Module

    {
        path: '/UserManagement/Users/ViewUsers',
        element: <ViewUsers />,
    },
    {
        path: '/UserManagement/Category/ViewCategory',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewCategory />
            </AuthHOC>
        ),
    },
    {
        path: '/UserManagement/Category/ViewSpecificCategory/:CategoryId',
        element: (
            <AuthHOC roles={['ADMIN']}>
                <ViewSpecificCategory />
            </AuthHOC>
        ),
    },

    //View Commiunity
    {
        path: '/CommunityModule/Community/ViewCommunity',
        element: <ViewListCommunity />,
    },
    {
        path: '/CommunityModule/Community/ViewSpecificCommunity/:CommunityId',
        element: <ViewSpecificCommunity />,
    },

    {
        path: '/CommunityModule/Community/CreateCommunity',
        element: <CreateCommunity />,
    },

    {
        path: '/CommunityModule/Community/EditCommunity/:CommunityId',
        element: <EditCommunity />,
    },

    //UPDATED TRIP SUB MODULE

    //--------HAIL TRIP---------------------------------

    {
        path: '/TripModule/Trips/HailTrips/ViewHailTrips',
        element: <ViewHailTrips />,
    },

    //--------ONGOING TRIPS---------------------------------

    {
        path: '/TripModule/Trips/OnGoingTrips/ViewOnGoingTrips',
        element: <ViewOnGoingTrips />,
    },

    //--------PAST TRIP---------------------------------

    {
        path: '/TripModule/Trips/PastTrips/ViewPastTrips',
        element: <ViewPastTrips />,
    },

    //--------SHEDULED TRIP---------------------------------

    {
        path: '/TripModule/Trips/SheduledTrips/ViewSheduleTrips',
        element: <ViewSheduleTrips />,
    },

    //--------NO RESPONSE TRIP---------------------------------

    {
        path: '/TripModule/Trips/NoResponseTrips/ViewNoResponse',
        element: <NoResponseTrips />,
    },

    //--------CANCELLED TRIP---------------------------------

    {
        path: '/TripModule/Trips/CancelledTrips/ViewCancelledTrips',
        element: <ViewCancelledTrips />,
    },

    //--------TRIP SETTINGS---------------------------------

    //TRIP SERVICE CITY
    {
        path: '/TripModule/TripSettings/ServiceCity/ViewServiceCity',
        element: <ViewServiceCity />,
    },
    {
        path: '/TripModule/TripSettings/ServiceCity/ViewSpecificServiceCity/:ServiceCityId',
        element: <ViewSpecificServiceCity />,
    },

    {
        path: '/TripModule/TripSettings/ServiceCity/CreateServiceCity',
        element: <CreateServiceCity />,
    },

    {
        path: '/TripModule/TripSettings/ServiceCity/EditServiceCity/:ServiceCityId',
        element: <EditServiceCity />,
    },

    //TRIP SERVICE TYPE
    {
        path: '/TripModule/TripSettings/ServiceType/ViewServiceType',
        element: <ViewServiceType />,
    },
    {
        path: '/TripModule/TripSettings/ServiceType/ViewSpecificServiceType/:CommunityId',
        element: <ViewSpecificServiceType />,
    },
    {
        path: '/TripModule/TripSettings/ServiceType/CreateServiceType',
        element: <CreateServiceType />,
    },
    {
        path: '/TripModule/TripSettings/ServiceType/EditServiceType/:CommunityId',
        element: <EditServiceType />,
    },

    //TRIP VEHICLE TYPE
    {
        path: '/TripModule/TripSettings/VehicleTypes/ViewVehicleTypes',
        element: <ViewVehicleType />,
    },
    {
        path: '/TripModule/TripSettings/VehicleType/ViewSpecificVehicleTypes/:VehicleTypeID',
        element: <ViewSpecificVehicleType />,
    },

    {
        path: '/TripModule/TripSettings/VehicleType/CreateVehicleTypes',
        element: <CreateVehicleType />,
    },

    {
        path: '/TripModule/TripSettings/VehicleType/EditVehicleTypes/:VehicleTypeID',
        element: <EditVehicleType />,
    },

    // trip settings

    // cancellation reason
    {
        path: '/TripModule/TripSettings/CancellationReason/ViewCancellationReason',
        element: <ViewCancellationReason />,
    },
    {
        path: '/TripModule/TripSettings/CancellationReason/ViewSpecificCancellationReason',
        element: <ViewSpecificCancellationReason />,
    },

    // cancellation settings
    {
        path: '/TripModule/TripSettings/CancellationSettings/ViewCancellationSettings',
        element: <ViewCancellationSettings />,
    },
    {
        path: '/TripModule/TripSettings/CancellationSettings/ViewSpecificCancellationSettings',
        element: <ViewSpecificCancellationSettings />,
    },

    // feedback reason
    {
        path: '/TripModule/TripSettings/FeedBackReason/ViewFeedBackReason',
        element: <ViewFeedBackReason />,
    },
    {
        path: '/TripModule/TripSettings/FeedBackReason/ViewSpecificFeedBackReason',
        element: <ViewSpecificFeedBackReason />,
    },

    //trips ratings
    {
        path: '/TripModule/TripRatings/ViewTripRatings',
        element: <ViewTripRatings />,
    },
    {
        path: '/TripModule/TripRatings/ViewSpecificTripRatings/:tripRatingiID',
        element: <ViewSpecificTripRatings />,
    },

    // service type

    // daily
    {
        path: '/TripModule/ServiceType/Daily/ViewDaily',
        element: <ViewDaily />,
    },
    {
        path: '/TripModule/ServiceType/Daily/ViewSpecificDaily/:DailyID',
        element: <ViewSpecificDaily />,
    },
    {
        path: '/TripModule/ServiceType/Daily/CreatDaily',
        element: <CreatDaily />,
    },
    {
        path: '/TripModule/ServiceType/Daily/EditDaily/:DailyID',
        element: <EditDaily />,
    },

    // rental
    {
        path: '/TripModule/ServiceType/Rental/ViewRental',
        element: <ViewRental />,
    },
    {
        path: '/TripModule/ServiceType/Rental/ViewSpecificRental/:RentalID',
        element: <ViewSpecificRental />,
    },
    {
        path: '/TripModule/ServiceType/Rental/CreatRentalPackage',
        element: <CreatRentalPackage />,
    },
    {
        path: '/TripModule/ServiceType/Rental/EditRentalPackage/:RentalID',
        element: <EditRentalPackage />,
    },

    // outstation
    {
        path: '/TripModule/ServiceType/Outstation/ViewOutstation',
        element: <ViewOutstation />,
    },
    {
        path: '/TripModule/ServiceType/Outstation/ViewSpecificOutstation/:OutstationID',
        element: <ViewSpecificOutstation />,
    },
    {
        path: '/TripModule/ServiceType/Rental/CreatOutstation',
        element: <CreatOutstation />,
    },
    {
        path: '/TripModule/ServiceType/Rental/EditOutstation/:OutstationID',
        element: <EditOutstation />,
    },

    // Map view

    // heat map
    {
        path: '/TripModule/MapView/HeatMap/ViewHeatMap',
        element: <ViewHeatMappage />,
    },

    // gods view
    {
        path: '/TripModule/MapView/GodsView/ViewGodsView',
        element: <ViewGodsViewpage />,
    },

    // driver tracking
    {
        path: '/TripModule/MapView/DriverTracking/ViewDriverTracking',
        element: <ViewDriverTracking />,
    },

    // dispatch

    // manual dispatch
    {
        path: '/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch',
        element: <AuthHOC roles={['ADMIN']}>{<ManualTaxiDispatch />}</AuthHOC>,
    },

    // pending request
    {
        path: '/TripModule/Dispatch/PendingRequest/ViewPendingRequest',
        element: <ViewPendingRequest />,
    },
    {
        path: '/TripModule/Dispatch/PendingRequest/ViewSpecificPendingRequest',
        element: <ViewSpecificPendingRequest />,
    },

    // scheduled bookings
    {
        path: '/TripModule/Dispatch/ScheduledBooking/ViewScheduledBooking',
        element: <ViewScheduledBooking />,
    },
    {
        path: '/TripModule/Dispatch/ScheduledBooking/ViewSpecificScheduledBooking',
        element: <ViewSpecificScheduledBooking />,
    },
];

export { routes };
